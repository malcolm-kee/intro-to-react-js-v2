const path = require('path');
const packageJson = require('./package.json');

module.exports = {
  siteMetadata: {
    title: `Introduction to React JS`,
    author: packageJson.author,
    description: packageJson.description
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(__dirname, 'instructions'),
        name: 'instructions'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(__dirname, 'README.md'),
        name: 'readme'
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          `gatsby-remark-prismjs`
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typography',
    'gatsby-plugin-netlify'
  ]
};
