import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext, UserTypes } from "../../contextAPI/User";
import "../../styles/settlements/addUser.css";
import axios from "axios";
import {
  HttpRequestsContext,
  HttpRequestsTypes,
} from "../../contextAPI/HttpRequests";
import { Settlement } from "../../types/SettlementTypes";

const CreateSettlement = (props: {
  settlements: Settlement[];
  setSettlements: Function;
}) => {
  const { loggedIn } = useContext(UserContext) as UserTypes;

  const { id } = useContext(UserContext) as UserTypes;

  const { baseURL } = useContext(HttpRequestsContext) as HttpRequestsTypes;

  const { setSettlements, settlements } = props ?? {};

  const [form, setForm] = useState({
    name: "",
  });

  const createSettlement = () => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          baseURL + `/users/${id}/settlements`,
          form
        );
        console.log(response);
        setSettlements([...settlements, response.data.data]);
        setForm({ ...form, name: "" });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createSettlement();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="create-container">
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <h3>Settlement Name</h3>
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="name"
            className="login-form-item"
            value={form.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button className="settlement-form-button" type="submit">
            Create settlement
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSettlement;
