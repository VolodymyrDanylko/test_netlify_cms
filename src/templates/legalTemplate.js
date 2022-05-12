import React from "react"
import { graphql } from "gatsby"

export default function LegalTemplate({ data }) {
  const { markdownRemark } = data
  const { html, seoTitle, seoDescription, title } = markdownRemark

  console.log(seoTitle, seoDescription)

  return (
    <>
      <h3 className="stickyTitle">{title}</h3>
      <div
        className="privacyContent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        seoTitle
        seoDescription
        title
      }
    }
  }
`
