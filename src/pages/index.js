import { graphql, Link } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Navbar } from '../components/navbar';
import { IssueReporter } from '../components/issue-reporter';
import reactLogo from '../images/logo.svg';

const IndexPage = ({ data }) => (
  <div className="landing-page">
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
      <meta name="author" content={data.site.siteMetadata.author} />
      <meta name="description" content={data.site.siteMetadata.description} />
    </Helmet>
    <Navbar title={data.site.siteMetadata.title} />
    <header className="landing-page-header">
      <div className="logo-section">
        <img src={reactLogo} id="react-logo" alt="React Logo" />
      </div>
      <div className="landing-title-container">
        <h1 className="landing-title">Introduction to React</h1>
      </div>
    </header>
    <main className="main-container">
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <section className="table-of-content-section">
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
      </section>
      <IssueReporter title="Home Page" />
    </main>
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
