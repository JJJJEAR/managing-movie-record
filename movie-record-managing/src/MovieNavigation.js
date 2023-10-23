import React from "react";
import { BrowserRouter, NavLink, Navigate, Routes, Route } from "react-router-dom";
import DBCreate from "./db-create";
import MovieLists from "./MovieLists";
import DBUpdate from "./db-update";
import DBRead from "./db-read";
import DBDelete from "./db-delete";
import "./navlink.css";
import Register from "./Register";
import Login from "./Login";

export default function MovieNavigation() {
    
    return (
        <BrowserRouter>
            <nav className="nav">
                <NavLink to="/" className={({ isActive }) => isActive ? "active_menu" : "menu" } >
                    Movie
                </NavLink>&nbsp;
                <NavLink to="/Register" className={({ isActive }) => isActive ? "active_menu" : "menu" } >
                    Register
                </NavLink>
                <NavLink to="/Login" className={({ isActive }) => isActive ? "active_menu" : "menu" } >
                    Login
                </NavLink>
            </nav>

            <Routes style={{ margin: "50px" }}>
                <Route path="/" element={<MovieLists/>} />
                <Route path="/Movie" element={<MovieLists />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/Register" element={<Register/>} />
                <Route path="/Login" element={<Login/>} />
            </Routes>
        </BrowserRouter>

    );
}
