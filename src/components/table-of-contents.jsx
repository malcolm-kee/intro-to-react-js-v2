import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';

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
      <section className="table-of-content-section">
        <div className="table-of-content-inner-container">
          <h2>Table of Contents</h2>
          <ol>
            {data.instructions.edges
              .map(edge => edge.node.frontmatter)
              .map(({ path, title }) => (
                <li key={path}>
                  <Link to={path}>{title}</Link>
                </li>
              ))}
          </ol>
        </div>
      </section>
    )}
  />
);
