import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-name">Aditya Meenakshisundaram</h1>
        <p className="hero-tagline">
          Innovating at the intersection of Chemical Engineering, Sustainable Energy, and AI.
        </p>
        <p className="hero-description">
          Welcome to my personal portfolio. I'm a passionate problem-solver, driven to develop sustainable and intelligent solutions for complex engineering challenges.
        </p>
        <Link to="/projects" className="hero-button">
          Explore My Work
        </Link>
      </div>
    </div>
  );
};

export default Home;
