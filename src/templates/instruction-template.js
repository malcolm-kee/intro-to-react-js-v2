import { graphql } from 'gatsby';
import React from 'react';
import { LinkButton } from '../components/button';
import { MaterialIcons } from '../components/material-icons';
import { PageContainer } from '../components/page-container';

const InstructionNav = ({ pageContext }) => (
  <nav className="instruction-template-nav">
    {pageContext.previous ? (
      <LinkButton to={pageContext.previous.frontmatter.path}>
        <MaterialIcons name="arrow_back" />
        <span className="hide-small">
          {pageContext.previous.frontmatter.title}
        </span>
      </LinkButton>
    ) : (
      <span />
    )}
    {pageContext.next ? (
      <LinkButton to={pageContext.next.frontmatter.path}>
        <span className="hide-small">{pageContext.next.frontmatter.title}</span>
        <MaterialIcons name="arrow_forward" />
      </LinkButton>
    ) : (
      <span />
    )}
  </nav>
);

const InstructionTemplate = ({ data, pageContext }) => (
  <PageContainer>
    <div className="instruction-template">
      <main>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </main>
      <InstructionNav pageContext={pageContext} />
    </div>
  </PageContainer>
);

export default InstructionTemplate;

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
    }
  }
`;
