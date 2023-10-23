import React from 'react';
import './style.css';

export default function Login() {
    const form = React.useRef();

    const onSubmitForm = async (event) => {
        event.preventDefault();

        const fd = new FormData(form.current);
        const fe = Object.fromEntries(fd.entries());

        console.log('Frontend Data:', JSON.stringify(fe));

        fetch('/api/db/login', {
            method: 'POST',
            body: JSON.stringify(fe),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    form.current.reset();
                    alert(result.message);
                    window.location.href = result.redirectTo;
                } else {
                    alert(result.error);
                }
            })
            .catch((err) => alert('Login failed',));
    };

    return (
        <form id="form-login" onSubmit={onSubmitForm} ref={form}>
            <h2>Login</h2>
            <label>Username:</label>
            <input type="text" name="username" required />
            <br />
            <label>Password:</label>
            <input type="password" name="password" required />
            <br />
            <button type="submit">Login</button>
        </form>
    );
}