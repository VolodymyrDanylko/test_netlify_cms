import * as React from "react"
import useSWR from "swr"
import { graphql } from "gatsby"
import { remark } from "remark"
import remarkHTML from "remark-html"
//import ReactHtmlParser from "react-html-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"

const toHTML = value => remark().use(remarkHTML).processSync(value).toString()

const PartnersPage = ({ data, location }) => {
  const frontmatter = data.markdownRemark.frontmatter
  const { sectionFAQ, path } = frontmatter

  const fetchWithToken = async (url, token) => {
    const headers = new Headers()

    headers.append("Content-Type", "application/json")
    headers.append("Accept", "application/json")
    headers.append("Authorization", `Bearer ${token}`)

    const response = await fetch(url, {
      method: "GET",
      headers,
    })

    return response
  }

  const { data: collections } = useSWR(
    [
      "https://api.intercom.io/help_center/collections",
      "dG9rOjFkOGIzODRmXzEyY2ZfNDRjMV85NDg3Xzk3NDFjYTE3OGZmMjoxOjA=",
    ],
    fetchWithToken
  )
  console.log(collections)
  console.log(5)

  return (
    <Layout location={location} title={path}>
      <Seo title="PartnersPage" />
      <h1>{path}</h1>

      {sectionFAQ.content?.length > 0 && (
        <section>
          <div>
            <div>
              <h2>{sectionFAQ.title}</h2>
              {sectionFAQ.content.map(({ question, answer }, index) => {
                const asHTML = toHTML(answer)

                return (
                  <div key={index}>
                    <div>{question}</div>

                    <div dangerouslySetInnerHTML={{ __html: asHTML }} />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}

export default PartnersPage

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        path
        sectionFAQ {
          title
          content {
            question
            answer
          }
        }
      }
    }
  }
`
