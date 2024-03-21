import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext, UserTypes } from "../../contextAPI/User";
import "../../styles/settlements/removeUser.css";
import { Settlement } from "../../types/SettlementTypes";
import axios from "axios";
import {
  HttpRequestsContext,
  HttpRequestsTypes,
} from "../../contextAPI/HttpRequests";
import { User } from "../../types/UserTypes";

const RemoveUser = (props: {
  settlement: Settlement;
  setSettlements: Function;
  settlements: Settlement[];
  users: User[];
}) => {
  const { loggedIn } = useContext(UserContext) as UserTypes;
  const { baseURL } = useContext(HttpRequestsContext) as HttpRequestsTypes;

  const { settlement, setSettlements, settlements, users } = props ?? {};

  const [form, setForm] = useState({
    removeUser: "",
  });

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    filterUsers();
  }, [users, settlements, settlement]);

  const filterUsers = () => {
    //Filter so that users already i settlement are included
    setFilteredUsers(
      users.filter((user) =>
        settlement.participants.some(
          (participant) => participant.id === user.id
        )
      )
    );
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { value } = e.target;

    setForm({
      ...form,
      removeUser: value,
    });
    filterUsers();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    removeUser();
    filterUsers();
  };

  const removeUser = () => {
    if (filteredUsers.length === 0) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.put(
          baseURL + `/settlements/${settlement.id}/remove/${form.removeUser}`
        );
        console.log(response);

        setSettlements(
          settlements.map((settle) =>
            settle.id === settlement.id
              ? {
                  ...settle,
                  participants: [
                    ...settle.participants.filter(
                      (participant) =>
                        participant.id !== Number(form.removeUser)
                    ),
                  ],
                }
              : settle
          )
        );

        //Remove user from filteredUsers
        setFilteredUsers(
          filteredUsers.filter((usr) => usr.id !== Number(form.removeUser))
        );
        console.log(settlement);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  };

  return (
    <div className="settlements-container">
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="addUser">
            <h3>RemoveUser</h3>
          </label>
          <select value={form.removeUser} onChange={(e) => handleChange(e)}>
            <option value="">Select a user to remove</option>

            {filteredUsers.map((user: User, index) => (
              <option key={index} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
          <button
            className="settlement-form-button"
            type="submit"
            disabled={!form.removeUser}
          >
            Remove user
          </button>
        </form>
      </div>
    </div>
  );
};

export default RemoveUser;
