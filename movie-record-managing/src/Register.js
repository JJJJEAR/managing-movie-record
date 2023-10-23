import React from 'react';
import './style.css'

export default function Register() {
    const form = React.useRef()
    const [role, setRole] = React.useState('MANAGER');

    const roles = ['MANAGER', 'TEAMLEADER', 'FLOORSTAFF'];
    const onSubmitForm = async (event) => {
        event.preventDefault();

        const fd = new FormData(form.current);
        const fe = Object.fromEntries(fd.entries())

        console.log('Frontend Data:', JSON.stringify(fe));

        fetch('/api/db/register', {
            method: 'POST',
            body: JSON.stringify({ ...fe, role }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((result) => {
                form.current.reset();
                setRole('MANAGER');
                alert('Registration successful');
            })
            .catch((err) => alert('Registration failed',));
    }

    return (
        <form id="form-register" onSubmit={onSubmitForm} ref={form} >
            <h2>Register</h2>
            <label>Username:</label>
            <input type="text" name="username" required />
            <br />
            <label>Password:</label>
            <input type="password" name="password" required />
            <br />
            <label>Role:</label>
            <select value={onSubmitForm} onChange={(e) => setRole(e.target.value)}>
                {roles.map((r) => (
                    <option key={r} value={r} >
                        {r}
                    </option>
                ))}
            </select>
            <br />
            <button onClick={onSubmitForm}>Register</button>
        </form>
    );
};
