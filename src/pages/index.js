import { graphql, Link } from 'gatsby';
import React from 'react';
import { PageContainer } from '../components/page-container';

const IndexPage = ({ data }) => (
  <PageContainer title={data.site.siteMetadata.title}>
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
  </PageContainer>
);

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: "/" } }) {
      html
      frontmatter {
        path
        title
      }
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
