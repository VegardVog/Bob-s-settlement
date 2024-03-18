import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext, UserTypes } from '../../contextAPI/User';
import "../../styles/profile.css"
import { HttpRequestsContext, HttpRequestsTypes } from '../../contextAPI/HttpRequests';
import axios from 'axios';

const Profile = () => {


    const {loggedIn, id} = useContext(UserContext) as UserTypes;
    const {baseURL} = useContext(HttpRequestsContext) as HttpRequestsTypes;

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL + `/users/${id}`)
                setForm({...form,
                    username: response.data.data.username,
                    email: response.data.data.email,
                })
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);


    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        putUser();

    };


    
    const putUser = () => {
        const fetchData = async () => {
            try {
                const response = await axios.put(baseURL + "/users", {
                    username: form.username,
                    email: form.email,
                    password: form.password,
                });

                navigate("/")
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setForm({
            ...form,
            [name]: value
        })
    };



  return (
    <div className='profile-container'>
        <div className='settlements-title'>
            <h1>Profile</h1>
        </div>

        <form>
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
            <button type='submit'>Update profile</button>
        </form>
    </div>
  )
}

export default Profile;