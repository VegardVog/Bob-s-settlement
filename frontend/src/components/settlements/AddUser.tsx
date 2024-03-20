import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext, UserTypes } from '../../contextAPI/User';
import "../../styles/settlements/addUser.css";
import axios from 'axios';
import { HttpRequestsContext, HttpRequestsTypes } from '../../contextAPI/HttpRequests';
import {User} from "../../types/UserTypes";
import { Settlement } from '../../types/SettlementTypes';

const AddUser = (props:{settlement: Settlement, setSettlements: Function, settlements: Settlement[]}) => {


    const {loggedIn} = useContext(UserContext) as UserTypes;

    const {id} = useContext(UserContext) as UserTypes;

    const {baseURL} = useContext(HttpRequestsContext) as HttpRequestsTypes;

    const {settlement, setSettlements, settlements} = props ?? {};

    const [form, setForm] = useState({
        addUser: "",
    });

    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])

    useEffect(() => {
        fetchUsers();

    }, []);

    useEffect(() => {
        filterUsers();
    }, [users]);


    const fetchUsers = () => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL + "/users");
                setUsers(response.data.data);

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }
    const filterUsers = () => {
        //Filter so that users already i settlement aren't included
        console.log(users)
        setFilteredUsers(users.filter((user) => settlement.participants.some((participant) => participant.id !== user.id)));
        console.log(settlement);
        console.log(filteredUsers)
        
    };

    const addUser = () => {
        const fetchData = async () => {
            try {
                const response = await axios.put(baseURL + `/settlements/${settlement.id}/add/${form.addUser}`);
                console.log(response);

                setSettlements(settlements.map((settle) => settle.id === settlement.id ? { ...settle, participants: [...settle.participants, users.find((user) => user.id === Number(form.addUser)) ?? {} as User] }: settle));
                console.log(settlement);
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
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const {value} = e.target;
  
        setForm({
            ...form,
            addUser: value
        })
        console.log(form.addUser)
        filterUsers();
        
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
        <ul>
        {settlement.participants.map((user: User, index) => (
            <li key={index}>{user.username}</li>
        
        ))
        }
        </ul>
    

        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='addUser'><h3>addUser</h3></label>
                <select value={form.addUser} onChange={(e) => handleChange(e)} >
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