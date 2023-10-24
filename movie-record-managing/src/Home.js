import React from 'react';
import MovieNavigation from "./MovieNavigation";

export default function Home() {
     
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