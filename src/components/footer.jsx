import React from 'react';
import { Helmet } from 'react-helmet';
import './footer.scss';

const getReportIssueLink = (bugUrl, pageTitle) =>
  pageTitle
    ? encodeURI(`${bugUrl}/new?title=Issue On ${pageTitle}`)
    : `${bugUrl}/new`;

export const Footer = ({ bugUrl }) => {
  const [pageTitle, setTitle] = React.useState('');

  return (
    <footer className="footer">
      <Helmet onChangeClientState={newState => setTitle(newState.title)} />
      <p>
        Found issue on this page?{' '}
        <a
          href={getReportIssueLink(bugUrl, pageTitle)}
          target="_BLANK"
          rel="noopener noreferrer"
        >
          Report here.
        </a>
      </p>
    </footer>
  );
};
