import React from 'react';
import { MaterialIcons } from './material-icons';

const getReportIssueLink = title =>
  title
    ? `https://github.com/malcolm-kee/intro-to-react-js/issues/new?title=Issue%20On%20${title}`
    : 'https://github.com/malcolm-kee/intro-to-react-js/issues/new';

export const IssueReporter = ({ title }) => (
  <div className="report-issue-link-container">
    <a
      href={getReportIssueLink(title)}
      className="report-issue-link"
      target="_BLANK"
      rel="noopener noreferrer"
    >
      <MaterialIcons name="report_problem" />
      Report issue on this page
    </a>
  </div>
);
