import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { MaterialIcons } from './material-icons';

export const PageContainer = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
            author
            description
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet>
          <title>{data.site.siteMetadata.title}</title>
          <meta name="author" content={data.site.siteMetadata.author} />
          <meta
            name="description"
            content={data.site.siteMetadata.description}
          />
        </Helmet>
        <header className="navbar">
          <Link to="/">{data.site.siteMetadata.title}</Link>
          <a
            href="https://github.com/malcolm-kee/intro-to-react-js"
            target="_BLANK"
            rel="noopener noreferrer"
          >
            <MaterialIcons name="code" />
          </a>
        </header>
        <main className="main-container">{children}</main>
      </div>
    )}
  />
);
