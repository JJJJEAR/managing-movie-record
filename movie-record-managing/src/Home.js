import React from 'react';
import { Link } from 'react-router-dom';
import CRUD from './db-nav'
import './Home.css'; 

export default function Home() {
  return (
    <div>
      <h1>Welcome to Movie Database</h1>
      <div className="btn btn-sm">
        <Link to="/login">
          <button className="btn btn-action">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn btn-action">Register</button>
        </Link>
      </div>
      <div>
        <h2>Movie Data</h2>
        <CRUD/>
      </div>
    </div>
  );
};

