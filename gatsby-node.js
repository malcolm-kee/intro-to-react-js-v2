const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((fulfill, reject) => {
    const instructionTemplate = path.resolve(
      __dirname,
      'src',
      'templates',
      'instruction-template.js'
    );

    return graphql(`
      {
        allMarkdownRemark(
          sort: { fields: fileAbsolutePath, order: ASC }
          filter: { frontmatter: { path: { ne: "/" } } }
        ) {
          edges {
            node {
              frontmatter {
                title
                path
              }
              html
            }
          }
        }
      }
    `)
      .then(result => {
        if (result.errors) {
          console.error(result.errors);
          return reject(result.errors);
        }

        const instructions = result.data.allMarkdownRemark.edges;

        instructions.forEach((instruction, index) => {
          const next =
            index === instructions.length - 1
              ? null
              : instructions[index + 1].node;
          const previous = index === 0 ? null : instructions[index - 1].node;

          createPage({
            path: instruction.node.frontmatter.path,
            component: instructionTemplate,
            context: {
              previous,
              next
            }
          });
        });

        fulfill();
      })
      .catch(reject);
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path === '/') {
    page.context.isRoot = true;
    createPage(page);
  }
};
