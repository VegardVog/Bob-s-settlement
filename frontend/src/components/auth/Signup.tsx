import React, { ChangeEvent, useContext, useState } from 'react';
import "../../styles/signup.css";
import axios from 'axios';
import { HttpRequestsContext, HttpRequestsTypes } from '../../contextAPI/HttpRequests';
import { UserContext, UserTypes } from '../../contextAPI/User';
import { useNavigate } from 'react-router';

const Signup  = () => {


    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: ["user"],
    });

    const {setLoggedIn} = useContext(UserContext) as UserTypes; 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postUser();

    };

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setForm({
            ...form,
            [name]: value
        })
    };

    const {baseURL} = useContext(HttpRequestsContext) as HttpRequestsTypes;

    const postUser = () => {
        const fetchData = async () => {
            try {
                const response = await axios.post(baseURL + "/auth/signup", {
                    username: form.username,
                    email: form.email,
                    password: form.password,
                    role: form.role,
                });

                setLoggedIn("true");
                navigate("/")
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }



    return (
        <div className='signup-container'>
            <form onSubmit={handleSubmit} className='signup-form-container'>
                <h2>Sign up</h2>
                <input 
                    name='username'
                    type="text"
                    required
                    placeholder='Username'
                    className='signup-form-item'
                    value={form.username}
                    onChange={(e) => {handleChange(e)}}
                    />
     

                <input 
                    name='email'
                    type="text"
                    required
                    placeholder='Email'
                    className='signup-form-item'
                    value={form.email}
                    onChange={(e) => {handleChange(e)}}
                    />

                <input 
                    name='password'
                    type="text"
                    required
                    placeholder='Password'
                    className='signup-form-item'
                    value={form.password}
                    onChange={(e) => {handleChange(e)}}
                    />

                <button type='submit' className='form-submitButton'>Create Account</button>
            </form>
        </div>
    )

}

export default Signup