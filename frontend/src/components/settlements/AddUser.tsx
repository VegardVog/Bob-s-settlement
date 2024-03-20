import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext, UserTypes } from '../../contextAPI/User';
import "../../styles/settlements/addUser.css";
import axios from 'axios';
import { HttpRequestsContext, HttpRequestsTypes } from '../../contextAPI/HttpRequests';
import {User} from "../../types/UserTypes";
import { Settlement } from '../../types/SettlementTypes';

const AddUser = (props:{settlement: Settlement}) => {


    const {loggedIn} = useContext(UserContext) as UserTypes;

    const {id} = useContext(UserContext) as UserTypes;

    const {baseURL} = useContext(HttpRequestsContext) as HttpRequestsTypes;

    const {settlement} = props ?? {};

    const [form, setForm] = useState({
        addUser: "",
    });

    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])

    useEffect(() => {
        console.log(settlement)

        const fectData = async () => {
            try {
                const response = await axios.get(baseURL + "/users");
                setUsers(response.data.data);

            } catch (error) {
                console.error(error);
            }
        }
        fectData();
    }, []);

    useEffect(() => {
        filterUsers();

    }, [users]);

    const filterUsers = () => {
        //Filter so that users already i settlement aren't included
        setFilteredUsers(users.filter((user) => settlement.participants.some((participant) => participant.id !== user.id)));
        
    };

    const addUser = () => {
        const fetchData = async () => {
            try {
                const response = await axios.put(baseURL + `/settlements/${settlement.id}/add/${form.addUser}`);
                console.log(response);

            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
  

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addUser();
        filterUsers();
        console.log(form.addUser)
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const {value} = e.target;
  
        setForm({
            ...form,
            addUser: value
        })
    

        
    };


    if(!users) {
        return <div>Loading...</div>;
    }

  return (
    <div className='settlements-container'>
        <div className='settlements-title'>
            <h1 >Settlements AddUser</h1>
        </div>
        <h3>Users in settlement</h3>
        {settlement.participants.map((user: User, index) => (
            <li key={index}>{user.username}</li>
        
        ))
        }

        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='addUser'><h3>addUser</h3></label>
                <select value={form.addUser} onChange={() => handleChange} >
                    <option value="">
                        Select a user to add
                    </option>
            
                {filteredUsers.map((user: User, index) => (
                    <option key={index} value={user.id}>
                        {user.username}
                    </option>
                ))}
                </select>
                <button className='settlement-form-button' type='submit'>Add user</button>
            </form>
        </div>
    </div>
  )
}

export default AddUser;