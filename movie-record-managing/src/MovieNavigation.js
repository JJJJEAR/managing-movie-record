import React from "react";
import { BrowserRouter, NavLink, Navigate, Routes, Route } from "react-router-dom";
import DBCreate from "./db-create";
import MovieLists from "./MovieLists";
import DBUpdate from "./db-update";
import DBRead from "./db-read";
import DBDelete from "./db-delete";
import { Login, Register } from "./auth";
import "./css/navlink.css";

export default function MovieNavigation() {

    const [role, setRole] = React.useState('MANAGER');

    React.useEffect(() => {
        const fetchUserRole = async () => {
            fetch('/api/db/getUserRole')
                .then(response => response.json())
                .then(result => setRole(result.role))
                .catch(err => alert(err))
        };

        fetchUserRole();
    }, []);

    const onClickLogout = (event) => {

        event.preventDefault();
        fetch('/api/db/logout')
            .then(response => response.text())
            .then(result => {
                alert('ออกจากระบบแล้ว');
                window.location.href = '/';
                setRole('null');
            })
            .catch(err => alert(err));
    };

    return (
        <BrowserRouter>
            <nav className="nav">
                {(role === 'null') && (
                    <>
                        <div style={{ paddingBottom: '10%', textAlign: 'left' }}>
                            <NavLink to="/" className={({ isActive }) => isActive ? "active_menu" : "menu"} >
                                Movie
                            </NavLink>&nbsp;
                        </div>
                        <div style={{paddingTop:'750px'}}>
                            <NavLink to="/login" className={({ isActive }) => isActive ? "active_menu" : "menu"} >
                                Login
                            </NavLink>
                            <NavLink to="/Register" className={({ isActive }) => isActive ? "active_menu" : "menu"} >
                                Register
                            </NavLink>&nbsp;
                        </div>
                    </>
                )}

                {(role === 'MANAGER' || role === 'TEAMLEADER' || role === 'FLOORSTAFF') && (
                    <>
                        <div style={{ paddingBottom: '10%', textAlign: 'left' }}>
                            <NavLink to="/" className={({ isActive }) => isActive ? "active_menu" : "menu"} >
                                Movie
                            </NavLink>&nbsp;
                            <NavLink to="/Create" className={({ isActive }) => isActive ? "active_menu" : "menu"} >
                                Create
                            </NavLink>&nbsp;
                            <NavLink to="/Read" className={({ isActive }) => isActive ? "active_menu" : "menu"} >
                                Read
                            </NavLink>&nbsp;
                            <NavLink to="/Update" className={({ isActive }) => isActive ? "active_menu" : "menu"} >
                                Update
                            </NavLink>&nbsp;
                            {role === 'MANAGER' && (
                                <NavLink to="/Delete" className={({ isActive }) => isActive ? "active_menu" : "menu"} >
                                    Delete
                                </NavLink>
                            )}&nbsp;
                        </div>
                    </>
                )}
            </nav>

            {(role === 'MANAGER' || role === 'TEAMLEADER' || role === 'FLOORSTAFF') && (
                <div style={{ marginTop: 'auto' }}>
                    <NavLink to="/logout" className={({ isActive }) => isActive ? "active_menu" : "menu"}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '8%' }}>
                        <button style={{ backgroundColor: 'red', padding: '10px 20px' }} onClick={onClickLogout}>Logout</button>
                    </NavLink>
                </div>
            )}

            <Routes style={{ margin: "20px" }}>
                <Route path="/" element={<MovieLists />} />
                <Route path="/Movie" element={<MovieLists />} />
                <Route path="*" element={<Navigate to="/" />} />
                {(role === 'MANAGER' || role === 'TEAMLEADER' || role === 'FLOORSTAFF') && (
                    <>
                        <Route path="/Create" element={<DBCreate />} />
                        <Route path="/Read" element={<DBRead />} />
                        <Route path="/Update" element={<DBUpdate />} />
                        {role === 'MANAGER' && (
                            <Route path="/Delete" element={<DBDelete />} />
                        )}
                    </>
                )}
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
            </Routes>

        </BrowserRouter>

    );
}
