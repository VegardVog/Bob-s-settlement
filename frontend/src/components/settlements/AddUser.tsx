import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext, UserTypes } from "../../contextAPI/User";
import "../../styles/settlements/addUser.css";
import axios from "axios";
import {
  HttpRequestsContext,
  HttpRequestsTypes,
} from "../../contextAPI/HttpRequests";
import { User } from "../../types/UserTypes";
import { Settlement } from "../../types/SettlementTypes";

const AddUser = (props: {
  settlement: Settlement;
  setSettlements: Function;
  settlements: Settlement[];
  users: User[];
}) => {
  const { loggedIn } = useContext(UserContext) as UserTypes;

  const { id } = useContext(UserContext) as UserTypes;

  const { baseURL } = useContext(HttpRequestsContext) as HttpRequestsTypes;

  const { settlement, setSettlements, settlements, users } = props ?? {};

  const [form, setForm] = useState({
    addUser: "",
  });

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    filterUsers();
  }, [users, settlements, settlement]);

  const filterUsers = () => {
    //Filter so that users already i settlement aren't included
    setFilteredUsers(
      users.filter(
        (user) =>
          !settlement.participants.some(
            (participant) => participant.id === user.id
          )
      )
    );
  };

  const addUser = () => {
    if (filteredUsers.length === 0) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.put(
          baseURL + `/settlements/${settlement.id}/add/${form.addUser}`
        );

        setSettlements(
          settlements.map((settle) =>
            settle.id === settlement.id
              ? {
                  ...settle,
                  participants: [
                    ...settle.participants,
                    users.find((user) => user.id === Number(form.addUser)) ??
                      ({} as User),
                  ],
                }
              : settle
          )
        );

        //Remove user from filteredUsers
        setFilteredUsers(
          filteredUsers.filter((usr) => usr.id !== Number(form.addUser))
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser();
    filterUsers();
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { value } = e.target;

    setForm({
      ...form,
      addUser: value,
    });
    filterUsers();
  };

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div className="settlements-container">
      <h3>Users in settlement</h3>
      <ul>
        {settlement.participants.map((user: User, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>

      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="addUser">
            <h3>addUser</h3>
          </label>
          <select value={form.addUser} onChange={(e) => handleChange(e)}>
            <option value="">Select a user to add</option>

            {filteredUsers.map((user: User, index) => (
              <option key={index} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
          <button
            className="settlement-form-button"
            type="submit"
            disabled={!form.addUser}
          >
            Add user
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
