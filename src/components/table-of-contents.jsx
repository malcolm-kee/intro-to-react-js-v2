import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';

const isActive = ({ isCurrent }) =>
  isCurrent ? { className: 'toc-link toc-link--active' } : null;

export const TableOfContents = () => (
  <StaticQuery
    query={graphql`
      query {
        instructions: allMarkdownRemark(
          sort: { fields: fileAbsolutePath, order: ASC }
          filter: { frontmatter: { path: { ne: "/" } } }
        ) {
          edges {
            node {
              frontmatter {
                title
                path
              }
            }
          }
        }
      }
    `}
    render={data => (
      <nav className="table-of-content-section">
        <div className="table-of-content-inner-container">
          <h2 className="table-of-content-header">Table of Contents</h2>
          <ol>
            {data.instructions.edges
              .map(edge => edge.node.frontmatter)
              .map(({ path, title }) => (
                <li key={path}>
                  <Link className="toc-link" getProps={isActive} to={path}>
                    {title}
                  </Link>
                </li>
              ))}
          </ol>
        </div>
      </nav>
    )}
  />
);
