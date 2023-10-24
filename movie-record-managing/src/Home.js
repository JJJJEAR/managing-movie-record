import React from 'react';
import MovieNavigation from "./MovieNavigation";
import { Login } from './LoginRegister';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = async (event) => {
        event.preventDefault();
        fetch('/api/db/logout')
            .then(response => response.text())
            .then(result => window.location.href= '/')
            .catch(err => alert('Logout failed:', err));
            
        setIsLoggedIn(false);
        alert('ออกจากระบบแล้ว');
    }

    return (
        <div>
            {/* {isLoggedIn ? (
                <div>
                    <MovieNavigation />
                    <button onClick={handleLogout} style={{ float: 'right' }} >Logout</button>
                </div>
            ) : (
                <div>
                    <Login onClick={handleLogin} />
                </div>
            )} */}
            <MovieNavigation />
        </div>
    );

};