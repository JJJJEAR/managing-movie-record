import React from 'react';
import MovieNavigation from "./MovieNavigation";
import MovieLogin from "./MovieLogin";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const handleLogin = async () => {
        setIsLoggedIn(true);
        window.location.href = '/MovieLogin';
    };

    const onClickLink = async (event) => {
        event.preventDefault();
        try {
            await fetch('/api/db/logout');
            setIsLoggedIn(false);
            window.location.href = '/MovieNavigation';
        } catch (err) {
            console.error('Logout failed:', err);
            alert('Logout failed');
        }
    }

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <MovieLogin />
                    <button onClick={(e) => onClickLink(e)} style={{ float: 'right' }} >Logout</button>
                </div>
            ) : (
                <div><MovieNavigation />
                <button onClick={(e) => onClickLink(e)} style={{ float: 'right' }} >Logout</button></div>
            )}
        </div>
    );
};
