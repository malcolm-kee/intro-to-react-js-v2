import { graphql, Link, StaticQuery } from 'gatsby';
import { joinClassName } from 'join-string';
import React from 'react';
import './table-of-contents.scss';

export const TableOfContents = ({ fixed = true, hide }) => (
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
      <nav
        className={joinClassName(
          'table-of-content-section',
          fixed && 'table-of-content-section--fixed',
          hide && 'table-of-content-section--hide'
        )}
      >
        <div className="table-of-content-inner-container">
          <ol>
            {data.instructions.edges
              .map(edge => edge.node.frontmatter)
              .map(({ path, title }) => (
                <li key={path}>
                  <Link
                    className="toc-link"
                    activeClassName="toc-link--active"
                    to={path}
                  >
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
