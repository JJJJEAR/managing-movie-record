import React from "react";
import { BrowserRouter, NavLink, Navigate, Routes, Route } from "react-router-dom";
import DBCreate from "./db-create";
import MovieLists from "./MovieLists";
import DBUpdate from "./db-update";
import DBRead from "./db-read";
import DBDelete from "./db-delete";
// import Session from "./session";
import "./navlink.css";
import Register from "./Register";

export default function MovieNavigation() {
    
    return (
        <BrowserRouter>
            <nav className="nav">
                <NavLink to="/" className={({ isActive }) => isActive ? "active_menu" : "menu" } >
                    Movie
                </NavLink>&nbsp;
                <NavLink to="/Create" className={({ isActive }) => isActive ? "active_menu" : "menu" } >
                    Create
                </NavLink>&nbsp;
                <NavLink to="/Read" className={({ isActive }) =>  isActive ? "active_menu" : "menu" } >
                    Read
                </NavLink>&nbsp;
                <NavLink to="/Update" className={({ isActive }) => isActive ? "active_menu" : "menu" } >
                    Update
                </NavLink>&nbsp;
                <NavLink to="/Delete" className={({ isActive }) => isActive ? "active_menu" : "menu" } >
                    Delete
                </NavLink>
                <NavLink to="/Register" className={({ isActive }) => isActive ? "active_menu" : "menu" } >
                    Register
                </NavLink>
            </nav>

            <Routes style={{ margin: "50px" }}>
                <Route path="/" element={<MovieLists/>} />
                <Route path="/Movie" element={<MovieLists />} />
                <Route path="/Create" element={<DBCreate />} />
                <Route path="/Read" element={<DBRead />} />
                <Route path="/Update" element={<DBUpdate />} />
                <Route path="/Delete" element={<DBDelete />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/Register" element={<Register/>} />
                {/* <Route path="/Login" element={<Session/>} /> */}
            </Routes>
        </BrowserRouter>

    );
}
