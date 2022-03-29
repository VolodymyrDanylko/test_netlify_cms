import * as React from "react"
import { graphql } from "gatsby"
import ReactHtmlParser from "react-html-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"

const PartnersPage = ({ data, location }) => {
  const frontmatter = data.markdownRemark.frontmatter

  const { sectionFAQ, path } = frontmatter

  return (
    <Layout location={location} title={path}>
      <Seo title="PartnersPage" />
      <h1>{path}</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>

      {sectionFAQ.content?.length > 0 && (
        <section>
          <div>
            <div>
              <h2>{sectionFAQ.title}</h2>
              {sectionFAQ.content.map(({ question }, index) => (
                <div key={index}>
                  <div>{question}</div>
                  {/* <div>{ReactHtmlParser(answer)}</div>
                  <div>answer</div> */}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}

export default PartnersPage

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        path
        sectionFAQ {
          title
          content {
            question
          }
        }
      }
    }
  }
`