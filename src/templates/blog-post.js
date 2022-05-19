import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const slug = post.fields.slug
  const { previous, next } = data

  const schemaMarkup = `{
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://dani-blog.netlify.app${slug}"
    },
    "headline": "${post.frontmatter.title}",
    "description": "${post.frontmatter.description || post.excerpt}",
    "image": "https://www.getbamboo.io/assets/Bamboo_SocialShare.jpg",  
    "author": {
      "@type": "Person",
      "name": "Volodymyr"
    },  
    "publisher": {
      "@type": "Organization",
      "name": "Dany",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.getbamboo.io/assets/bamboologo.png"
      }
    },
    "datePublished": "${post.frontmatter.date}"
  }`

  // const schemaMarkup = `{
  //   "@context": "https://schema.org",
  //   "@type": "BlogPosting",
  //   "mainEntityOfPage": {
  //     "@type": "WebPage",
  //     "@id": "${SITE_URL}${path}"
  //   },
  //   "headline": "${frontmatter.title}",
  //   "description": "${frontmatter.description || excerpt || DESCRIPTION}",
  //   "image": "${
  //     socialSharingImage && DEFAULT_IMAGE_FOLDER + socialSharingImage
  //   }",
  //   "author": {
  //     "@type": "Person",
  //     "name": "${author.frontmatter.name}"
  //   },
  //   "publisher": {
  //     "@type": "Organization",
  //     "name": "${BAMBOO_ORGANIZATION_NAME}",
  //     "logo": {
  //       "@type": "ImageObject",
  //       "url": "${BAMBOO_LOGO_SRC}"
  //     }
  //   },
  //   "datePublished": "${frontmatter.date}"
  // }`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        schemaMarkup={schemaMarkup}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          {/* {post.frontmatter.image && (
            <img width={540} src={post.frontmatter.image} alt="post avatar" />
          )} */}
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }

    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        image
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
