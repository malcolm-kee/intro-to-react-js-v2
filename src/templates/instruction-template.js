import { graphql } from 'gatsby';
import { joinClassName } from 'join-string';
import React from 'react';
import { LinkButton } from '../components/button';
import { MaterialIcons } from '../components/material-icons';
import { PageContainer } from '../components/page-container';

const InstructionNav = ({ pageContext, top }) => (
  <nav
    className={joinClassName(
      'instruction-template-nav',
      top && 'instruction-template-nav--top'
    )}
  >
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
      <InstructionNav pageContext={pageContext} top />
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
