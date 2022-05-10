import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SubscribersCounterSection from "../components/subscribers-counter-section/SubscribersCounterSection"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  // const podcasts = data.allPodcastJson.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <SubscribersCounterSection />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          console.log(post.frontmatter?.countOfEmailSubscribers)
          const image =
            post?.frontmatter?.featuredimage?.childImageSharp?.gatsbyImageData

          // const path = post.frontmatter.url
          //   ? `/${post.frontmatter.url}/`
          //   : post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                {/* 
                {post.frontmatter.image && (
                  <img
                    width={540}
                    src={post.frontmatter.image}
                    alt="post avatar"
                  />
                )} */}

                <GatsbyImage image={image} />
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>

      {/* {podcasts.map((item, index) => {
        const image = item?.podcastImage?.childImageSharp?.gatsbyImageData
        console.log(image)

        return (
          <div key={index}>
            <GatsbyImage image={image} />
            <h3>{item.title}</h3>
            <div>{item.audio}</div>
          </div>
        )
      })} */}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          countOfEmailSubscribers
          date(formatString: "MMMM DD, YYYY")
          title
          url
          featuredimage {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
          description
        }
      }
    }
  }
`
