import { Link } from 'gatsby';
import { joinClassName } from 'join-string';
import React from 'react';
import { MaterialIcons } from './material-icons';

const getReportIssueLink = (bugUrl, pageTitle) =>
  pageTitle
    ? encodeURI(`${bugUrl}/new?title=Issue On ${pageTitle}`)
    : `${bugUrl}/new`;

export const Navbar = ({ siteTitle, repositoryUrl, bugUrl, theme, hide }) => (
  <header className={joinClassName('navbar', hide && 'navbar--hide')}>
    <Link to="/">{siteTitle}</Link>
    <div className="navbar-toolbar">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={e =>
          window.__setPreferredTheme(e.target.checked ? 'dark' : 'light')
        }
      />
      <a
        href={repositoryUrl}
        aria-label="GitHub repo of this site"
        title="GitHub repo of this site"
        target="_BLANK"
        rel="noopener noreferrer"
        className="github-link"
      >
        GitHub
      </a>
      <a
        href={getReportIssueLink(bugUrl)}
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
