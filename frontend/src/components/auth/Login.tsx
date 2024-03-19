import React, { ChangeEvent, useContext, useState } from 'react'
import "../../styles/login.css";
import axios from 'axios';
import { UserContext, UserTypes } from '../../contextAPI/User';
import { HttpRequestsContext, HttpRequestsTypes } from '../../contextAPI/HttpRequests';
import { useNavigate } from 'react-router-dom';


const Login = () =>{

  const [form, setForm] = useState({
    username: "",
    password: "",
});

const navigate = useNavigate();

const {setLoggedIn, setId} = useContext(UserContext) as UserTypes;

const {baseURL} = useContext(HttpRequestsContext) as HttpRequestsTypes; 

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser();
};

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm({
        ...form,
        [name]: value
    })
};

    const loginUser = () => {
        const fetchData = async () => {

            try {
                const response = await axios.post(baseURL + "/auth/signin", form);
                setLoggedIn("true");
                setId(response.data.id);
                console.log(response);
                navigate("/");
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
  

    }

    return (
      <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form-container'>
          <h2>Login</h2>

          <label htmlFor='username'><h3>Username</h3></label>
          <input 
              name='username'
              type="text"
              required
              placeholder='Username'
              className='login-form-item'
              value={form.username}
              onChange={(e) => {handleChange(e)}}
              />

            <label htmlFor='password'><h3>Password</h3></label>
          <input 
              name='password'
              type="password"
              required
              placeholder='Password'
              className='login-form-item'
              value={form.password}
              onChange={(e) => {handleChange(e)}}
              />

          <button type='submit' className='form-submitButton'>Login</button>
      </form>
  </div>
    )
}

export default Login