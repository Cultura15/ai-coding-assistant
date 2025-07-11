'use client'

import { useState, useEffect, FormEvent } from "react"

interface User{
    id: number;
    email: string;
}


export default function page(){
    const [users, setUsers] = useState<User[]>([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [editId, setEditId] = useState<number | null>(null);


    // useEffect(() => {
    //     fetch('/api/registerSampleSample')
    //     .then((res) => res.json())
    //     .then((data) => setUsers(data));
    // }, []);

    const fetchUsers = async () => {
        const res = await fetch('/api/registerSample')
        const data = await res.json()
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (editId !== null){

            await fetch('/api/registerSample',{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: editId, email, password})
        });
        setEditId(null);
            
        }else{

            await fetch('/api/registerSample',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });
        }

        await fetchUsers();
        setEmail('');
        setPassword('');
    }

    const handleDelete = async (id: number) => {
        await fetch('/api/registerSample',{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id})
        });
        fetchUsers();
    }

    const handleEdit = (user: User) => {
        setEmail(user.email);
        setPassword('');
        setEditId(user.id);
    };
    

    return(

        <div>
            <h1>{editId !== null ? 'Edit User' : 'Register User'}</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password"
                    placeholder={editId ? 'New Password' : 'Password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type = "submit">{editId != null ? 'Update' : 'Register'}</button>
            </form>

            <h2>Registered User</h2>
            <ul>
                {users.map((user) => (
                    <li key = {user.id}>
                        Email: {user.email}{''}
                        <button onClick={() => handleEdit(user)}>Edit</button>{''}
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            </div>
    );
}