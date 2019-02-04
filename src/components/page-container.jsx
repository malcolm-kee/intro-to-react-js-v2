import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Navbar } from './navbar';

export const PageContainer = ({ pageTitle, children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
            author
            description
            repositoryUrl
            bugUrl
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
        <Navbar
          siteTitle={data.site.siteMetadata.title}
          pageTitle={pageTitle}
          repositoryUrl={data.site.siteMetadata.repositoryUrl}
          bugUrl={data.site.siteMetadata.bugUrl}
        />
        <main className="main-container">{children}</main>
      </div>
    )}
  />
);
