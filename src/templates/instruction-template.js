import { graphql, Link } from 'gatsby';
import React from 'react';
import { PageContainer } from '../components/page-container';

const InstructionTemplate = ({ data, pageContext }) => (
  <PageContainer title={data.site.siteMetadata.title}>
    <div className="instruction-template">
      <main>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </main>
      <nav
        className="instruction-template-nav"
        style={{ display: 'flex', justifyContent: 'space-around' }}
      >
        {pageContext.previous && (
          <Link to={pageContext.previous.frontmatter.path}>Previous</Link>
        )}
        {pageContext.next && (
          <Link to={pageContext.next.frontmatter.path}>Next</Link>
        )}
      </nav>
    </div>
  </PageContainer>
);

export default InstructionTemplate;

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
