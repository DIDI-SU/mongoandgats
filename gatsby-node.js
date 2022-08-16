exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}

const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    {
      books: allMongodbGatsbyBooks {
        edges {
          node {
            id
          }
        }
      }
    }
  `)

  const pageTemplate = path.resolve("./src/components/books.js")
  for (const { node } of data.books.edges) {
    createPage({
      path: `/book/${node.id}/`,
      component: pageTemplate,
      context: {
        id: node.id,
      },
    })
  }
}
