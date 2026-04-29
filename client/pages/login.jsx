import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login({ userStatus, verificaAuth }) {
    const navigate = useNavigate();

    // test
    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": "test@progetto.it",
                "password": "PasswordSicura1!"
            }),
            credentials: 'include' // DA METTERE SEMPRE NEL FETCH
        });

        if (res.ok) {
            verificaAuth();
            navigate('/home');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <h1>SignUp</h1>
            <button onClick={handleLogin}>Test</button>
        </div>
    );
}