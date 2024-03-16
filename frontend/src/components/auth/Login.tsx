import React, { ChangeEvent, useState } from 'react'
import "../../styles/login.css";


const Login = () =>{

  const [form, setForm] = useState({
    email: "",
    password: "",
});

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


};

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm({
        ...form,
        [name]: value
    })
};


    return (
      <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form-container'>
          <h2>Login</h2>
          <input 
              name='email'
              type="text"
              required
              placeholder='Email'
              className='login-form-item'
              value={form.email}
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