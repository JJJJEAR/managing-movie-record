import React from 'react';
import './style.css'

export default function Register() {
    const form = React.useRef()
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState(''); 

    const roles = ['MANAGER', 'TEAMLEADER', 'FLOORSTAFF']; 
    const handleRegister = async (event) => {
        event.preventDefault();
      
        const fd = new FormData(form.current);
        console.log(fd);
      
        fetch('/api/db/register', {
          method: 'POST',
          body: fd,
        })
          .then((response) => response.json())
          .then((result) => {
            form.current.reset();
            alert('Registration successful');
          })
          .catch((err) => alert('Registration failed'));
      }

  return (
    <div>
      <h2>Register</h2>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <label>Role:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};
