import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

export const PageContainer = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet>
          <title>{data.site.siteMetadata.title}</title>
        </Helmet>
        <header className="navbar">
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </header>
        <main style={{ padding: '64px 32px 32px' }}>{children}</main>
      </div>
    )}
  />
);
