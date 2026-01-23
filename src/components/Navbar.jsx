import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Aditya Meenakshisundaram</NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/experience">Experience</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/projects">Projects</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/leadership">Leadership</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/interests">Interests</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
