const path = require(`path`)

const legalTemplate = path.resolve("src/templates/legalTemplate.js")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              layout
              url
              path
              country
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const postsUS = result.data.allMarkdownRemark.nodes.filter(
    node =>
      node.frontmatter.layout === "blog" && node.frontmatter.country === "us"
  )
  const postsUA = result.data.allMarkdownRemark.nodes.filter(
    node =>
      node.frontmatter.layout === "blog" && node.frontmatter.country === "ua"
  )

  const legalPagesUS = result.data.allMarkdownRemark.nodes.filter(node =>
    node?.frontmatter?.path?.startsWith("/us/legal/")
  )

  legalPagesUS?.forEach(node => {
    createPage({
      path: node.frontmatter.path,
      component: legalTemplate,
      context: {},
    })
  })

  const legalPagesUA = result.data.allMarkdownRemark.nodes.filter(node =>
    node?.frontmatter?.path?.startsWith("/ua/legal/")
  )

  legalPagesUA?.forEach(node => {
    createPage({
      path: node.frontmatter.path,
      component: legalTemplate,
      context: {},
    })
  })

  // allMarkdownFiles.forEach(({ node }) => {
  //   if (node?.frontmatter?.path?.startsWith('/legal/')) {
  //     createPage({
  //       path: node.frontmatter.path,
  //       component: componentForPath(node.frontmatter.path),
  //       context: {},
  //     })
  //   }
  // })

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (postsUS.length > 0) {
    postsUS.forEach((post, index) => {
      const previousPostId = index === 0 ? null : postsUS[index - 1].id
      const nextPostId =
        index === postsUS.length - 1 ? null : postsUS[index + 1].id
      // const path = post.frontmatter.url
      //   ? post.frontmatter.url
      //   : post.fields.slug
      createPage({
        path: "us" + post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  if (postsUA.length > 0) {
    postsUA.forEach((post, index) => {
      const previousPostId = index === 0 ? null : postsUA[index - 1].id
      const nextPostId =
        index === postsUA.length - 1 ? null : postsUA[index + 1].id
      // const path = post.frontmatter.url
      //   ? post.frontmatter.url
      //   : post.fields.slug
      createPage({
        path: "ua" + post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    

    type SectionFAQ {
      title: String
      content: [Content]
    }

    type Content {
      question: String
      answer: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      seoTitle: String
      path: String
      seoDescription: String
      url: String
      date: Date @dateformat
      authorFull: AuthorsJson @link(by: "email", from: "author")
      sectionFAQ: SectionFAQ
    }

    type Fields {
      slug: String
    }

  `)
}
