import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function LegalTemplate({ data }) {
  const { markdownRemark } = data
  const {
    html,
    frontmatter: { title },
  } = markdownRemark

  return (
    <Layout>
      <h3 className="stickyTitle">{title}</h3>
      <div
        className="privacyContent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
