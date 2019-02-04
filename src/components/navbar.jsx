import { Link } from 'gatsby';
import React from 'react';
import githubLogo from '../images/github-small.png';
import { MaterialIcons } from './material-icons';

const getReportIssueLink = (bugUrl, pageTitle) =>
  pageTitle
    ? encodeURI(`${bugUrl}/new?title=Issue On ${pageTitle}`)
    : `${bugUrl}/new`;

export const Navbar = ({ siteTitle, pageTitle, repositoryUrl, bugUrl }) => (
  <header className="navbar">
    <Link to="/">{siteTitle}</Link>
    <div className="navbar-toolbar">
      <a
        href={repositoryUrl}
        aria-label="GitHub repo of this site"
        title="GitHub repo of this site"
        target="_BLANK"
        rel="noopener noreferrer"
        className="github-logo-container icon-button"
      >
        <img className="github-logo" src={githubLogo} alt="github logo" />
      </a>
      <a
        href={getReportIssueLink(bugUrl, pageTitle)}
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
