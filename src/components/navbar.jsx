import { Link } from 'gatsby';
import React from 'react';
import githubLogo from '../images/github-small.png';
import { MaterialIcons } from './material-icons';

const getReportIssueLink = pageTitle =>
  pageTitle
    ? encodeURI(
        `https://github.com/malcolm-kee/intro-to-react-js-v2/issues/new?title=Issue On ${pageTitle}`
      )
    : 'https://github.com/malcolm-kee/intro-to-react-js-v2/issues/new';

export const Navbar = ({ siteTitle, pageTitle }) => (
  <header className="navbar">
    <Link to="/">{siteTitle}</Link>
    <div className="navbar-toolbar">
      <a
        href="https://github.com/malcolm-kee/intro-to-react-js-v2"
        aria-label="Github repo of this site"
        title="Github repo of this site"
        target="_BLANK"
        rel="noopener noreferrer"
        className="github-logo-container icon-button"
      >
        <img className="github-logo" src={githubLogo} alt="github logo" />
      </a>
      <a
        href={getReportIssueLink(pageTitle)}
        aria-label="report issue on this page"
        title="report issue on this page"
        target="_BLANK"
        rel="noopener noreferrer"
        className="icon-button icon-button--danger"
      >
        <MaterialIcons name="report_problem" />
      </a>
    </div>
  </header>
);
