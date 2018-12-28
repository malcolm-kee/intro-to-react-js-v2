import { graphql, Link } from 'gatsby';
import React from 'react';
import { PageContainer } from '../components/page-container';

const IndexPage = ({ data }) => (
  <PageContainer>
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    <h2>Table of Contents</h2>
    <ul>
      {data.instructions.edges
        .map(edge => edge.node.frontmatter)
        .map(({ path, title }) => (
          <li key={path}>
            <Link to={path}>{title}</Link>
          </li>
        ))}
    </ul>
    <p>To be continued...</p>
  </PageContainer>
);

export default IndexPage;

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { path: { eq: "/" } }) {
      html
    }
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
`;
