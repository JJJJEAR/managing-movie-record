import React from "react";
import { BrowserRouter, NavLink, Navigate, Routes, Route } from "react-router-dom";
import DBCreate from "./db-create";
import MovieLists from "./MovieLists";
import DBUpdate from "./db-update";
import DBRead from "./db-read";
import DBDelete from "./db-delete";
import "./navlink.css";

export default function MovieNavigation() {
    return (
        <BrowserRouter>
            <nav className="nav">
                <NavLink to="/" className={({ isActive }) => isActive ? "active_menu" : "menu" }
                style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                    };
                }}>Movie</NavLink>&nbsp;
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
            </nav>

            <Routes style={{ margin: "20px" }}>
                <Route path="/" element={<MovieLists/>} />
                <Route path="/Movie" element={<MovieLists />} />
                <Route path="/Create" element={<DBCreate />} />
                <Route path="/Read" element={<DBRead />} />
                <Route path="/Update" element={<DBUpdate />} />
                <Route path="/Delete" element={<DBDelete />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
