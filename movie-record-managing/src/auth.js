import React from 'react';
import "./css/Loginstyle.css"

const Register = () => {
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
                window.location.href = result.redirectTo;
            })
            .catch((err) => alert('Registration failed',));
    }

    return (
        <div id="login-container" class="container">
        <form id="form-register" onSubmit={onSubmitForm} ref={form} >
            <h2 style={{paddingBottom:'10px'}}>Register</h2>
            <div>
                <label style={{paddingRight:'10px'}} >Username:</label>
                <input type="text" name="username" required />
            </div><br/>
            <div>
                <label style={{paddingRight:'10px'}}>Password:</label>
                <input type="password" name="password" required />
            </div><br/>
            <div>
                <label style={{paddingRight:'10px'}}>Role:</label>
                <select value={onSubmitForm} onChange={(e) => setRole(e.target.value)}>
                {roles.map((r) => (
                    <option key={r} value={r} >
                        {r}
                    </option>
                ))}
                </select>
            </div><br/>

            <button onClick={onSubmitForm}>Register</button>
        </form>
        </div>
    );
};

const Login = () => {
    const form = React.useRef();

    const onSubmitForm = async (event) => {
        event.preventDefault();

        const username = form.current.username.value;  
        const password = form.current.password.value; 

        fetch('/api/db/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.signedIn) {
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
        <div id="login-container" class="container">
        <form id="form-login" onSubmit={onSubmitForm} ref={form}>
        <h2>Login</h2>
            <div>
                <label style={{paddingRight:'10px'}}>Username:  </label>
                <input type="text" name="username" required />
            </div><br/>
            <div>
                <label style={{paddingRight:'10px'}}>Password:  </label>
                <input type="password" name="password" required />
            </div><br/>
            <button type="submit">Login</button>
        </form>
        </div>
    );
}

const Logout = (event) => {

    event.preventDefault();
    fetch('/api/db/logout')
        .then(response => response.text())
        .then(result => {     
            alert('ออกจากระบบแล้ว');
            window.location.href = '/';
        })
        .catch(err => alert('Logout failed:', err));
};
export { Login, Register , Logout };
