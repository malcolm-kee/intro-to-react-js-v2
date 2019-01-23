import { Link } from 'gatsby';
import React from 'react';
import githubLogo from '../images/github-small.png';

export const Navbar = ({ title }) => (
  <header className="navbar">
    <Link to="/">{title}</Link>
    <a
      href="https://github.com/malcolm-kee/intro-to-react-js"
      className="github-logo-container"
      target="_BLANK"
      rel="noopener noreferrer"
    >
      <img className="github-logo" src={githubLogo} alt="github logo" />
    </a>
  </header>
);
