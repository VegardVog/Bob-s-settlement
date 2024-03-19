import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext, UserTypes } from '../../contextAPI/User';
import "../../styles/settlements/addUser.css";
import axios from 'axios';
import { HttpRequestsContext, HttpRequestsTypes } from '../../contextAPI/HttpRequests';

const AddUser = () => {


    const {loggedIn} = useContext(UserContext) as UserTypes;

    const {id} = useContext(UserContext) as UserTypes;

    const {baseURL} = useContext(HttpRequestsContext) as HttpRequestsTypes;

    const [form, setForm] = useState({
        addUser: 0,
    });


    const addUser = () => {
        const fetchData = async () => {

            try {
                const response = await axios.post(baseURL + `/settlements/${id}/settlements`, form);
                console.log(response);

            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
  

    }

    const handleSubmit = () => {
        addUser();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setForm({
            ...form,
            [name]: value
        })
    };



  return (
    <div className='settlements-container'>
        <div className='settlements-title'>
            <h1 >Settlements AddUser</h1>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='addUser'><h3>addUser</h3></label>
                <input 
                    name='addUser'
                    type="text"
                    required
                    placeholder='addUser'
                    className='login-form-item'
                    value={form.addUser}
                    onChange={(e) => {handleChange(e)}}
                    />
                <button className='settlement-form-button' type='submit'>Create settlement</button>
            </form>
        </div>
    </div>
  )
}

export default AddUser;