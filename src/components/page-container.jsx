import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Navbar } from './navbar';
import { TableOfContents } from './table-of-contents';
import { joinClassName } from 'join-string';

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
          bugUrl={data.site.siteMetadata.bugUrl}
          theme={theme}
          hide={isRoot}
        />
        <main className={joinClassName(!isRoot && 'main-container')}>
          {children}
        </main>
        <TableOfContents fixed hide={isRoot} />
      </div>
    )}
  />
);
