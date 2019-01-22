import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Navbar } from './navbar';

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
        <Navbar title={data.site.siteMetadata.title} />
        <main className="main-container">{children}</main>
      </div>
    )}
  />
);
