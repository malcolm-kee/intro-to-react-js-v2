import React from 'react';
import { LinkButton } from '../components/button';
import { MaterialIcons } from '../components/material-icons';
import githubLogo from '../images/github-small.png';
import reactLogo from '../images/logo.svg';

export const LandingPageHeader = () => (
  <header className="landing-page-header">
    <div className="logo-section">
      <img src={reactLogo} id="react-logo" alt="React Logo" />
    </div>
    <div className="landing-title-container">
      <h1 className="landing-title">Introduction to React</h1>
      <div className="button-toolbar">
        <LinkButton to="/introduction" primary large>
          Start <MaterialIcons name="arrow_forward" />
        </LinkButton>
        <a
          href="https://github.com/malcolm-kee/intro-to-react-js"
          className="button button--large"
          target="_BLANK"
          rel="noopener noreferrer"
          style={{ color: 'black' }}
        >
          <img className="github-logo" src={githubLogo} alt="Github Logo" />
          <span className="hide-small">Source</span>
        </a>
      </div>
    </div>
  </header>
);
