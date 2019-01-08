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
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590
            }
          },
          'gatsby-remark-prismjs',
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              active: true,
              size: 32,
              class: 'emoji-icon'
            }
          }
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/config/typography'
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Intro to ReactJS',
        short_name: 'React Intro',
        start_url: '/',
        background_color: '#fdf6e3',
        theme_color: '#61dafb',
        display: 'standalone',
        icon: 'src/images/react-logo.png',
        legacy: true
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify'
  ]
};
