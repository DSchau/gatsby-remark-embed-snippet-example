const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = function ({ node, getNode, actions }) {
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({
      node,
      getNode
    })

    actions.createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}

exports.createPages = async function createPages({ actions, graphql }) {
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const template = path.resolve(`src/templates/post.js`)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const slug = node.fields.slug
    actions.createPage({
      component: template,
      path: slug,
      context: {
        slug
      }
    })
  })
}
