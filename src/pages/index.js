import { graphql, Link } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { LandingPageHeader } from '../components/landing-page-header';
import { MaterialIcons } from '../components/material-icons';
import { TableOfContents } from '../components/table-of-contents';

const IndexPage = ({ data }) => (
  <div className="landing-page">
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
      <meta name="author" content={data.site.siteMetadata.author} />
      <meta name="description" content={data.site.siteMetadata.description} />
    </Helmet>
    <LandingPageHeader />
    <div className="landing-page-content">
      <article
        className="main-container"
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
      <div className="button-toolbar">
        <Link
          to="/introduction/"
          className="button button--large button--primary"
        >
          Start Learning <MaterialIcons name="arrow_forward" />
        </Link>
      </div>
      <TableOfContents />
    </div>
  </div>
);

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
        description
      }
    }
    markdownRemark(frontmatter: { path: { eq: "/" } }) {
      html
    }
  }
`;
