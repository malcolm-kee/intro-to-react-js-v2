import { Link } from 'gatsby';
import React from 'react';
import { MaterialIcons } from './material-icons';

export const Navbar = ({ title }) => (
  <header className="navbar">
    <Link to="/">{title}</Link>
    <a
      href="https://github.com/malcolm-kee/intro-to-react-js"
      target="_BLANK"
      rel="noopener noreferrer"
    >
      <MaterialIcons name="code" />
    </a>
  </header>
);
