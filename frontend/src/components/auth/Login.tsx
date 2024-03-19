import React, { ChangeEvent, useContext, useState } from 'react'
import "../../styles/login.css";
import axios from 'axios';
import { UserContext, UserTypes } from '../../contextAPI/User';
import { HttpRequestsContext, HttpRequestsTypes } from '../../contextAPI/HttpRequests';


const Login = () =>{

  const [form, setForm] = useState({
    username: "",
    password: "",
});


const {setLoggedIn, loggedIn} = useContext(UserContext) as UserTypes;

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
                console.log(response)
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
          <input 
              name='username'
              type="text"
              required
              placeholder='Username'
              className='login-form-item'
              value={form.username}
              onChange={(e) => {handleChange(e)}}
              />

          <input 
              name='password'
              type="text"
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