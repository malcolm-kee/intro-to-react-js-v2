import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Footer } from './footer';
import { Navbar } from './navbar';
import { TableOfContents } from './table-of-contents';

export const PageContainer = ({ children, isRoot, theme }) => (
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
      <div style={{ color: 'var(--textNormal)' }}>
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
          repositoryUrl={data.site.siteMetadata.repositoryUrl}
          theme={theme}
          hide={isRoot}
        />
        <div>
          <main>{children}</main>
          <Footer bugUrl={data.site.siteMetadata.bugUrl} />
        </div>
        <TableOfContents fixed hide={isRoot} />
      </div>
    )}
  />
);
