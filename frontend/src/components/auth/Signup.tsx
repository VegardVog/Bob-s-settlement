import React, { ChangeEvent, useState } from 'react';
import "../../styles/signup.css";

const Signup  = () => {


    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
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
        <div className='signup-container'>
            <form onSubmit={handleSubmit} className='signup-form-container'>
                <h2>Sign up</h2>
                <input 
                    name='firstName'
                    type="text"
                    required
                    placeholder='First Name'
                    className='signup-form-item'
                    value={form.firstName}
                    onChange={(e) => {handleChange(e)}}
                    />
                <input 
                    name='lastName'
                    type="text"
                    required
                    placeholder='Last Name'
                    className='signup-form-item'
                    value={form.lastName}
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