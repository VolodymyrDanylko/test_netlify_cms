import * as React from "react"
// import useSWR from "swr"
// import fetchToCurl from "fetch-to-curl"
import { graphql } from "gatsby"
import { remark } from "remark"
import remarkHTML from "remark-html"
//import ReactHtmlParser from "react-html-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"

const toHTML = value => remark().use(remarkHTML).processSync(value).toString()

const getStaticProps = async () => {
  const myHeaders = new Headers()
  myHeaders.append(
    "Authorization",
    "Bearer dG9rOjFkOGIzODRmXzEyY2ZfNDRjMV85NDg3Xzk3NDFjYTE3OGZmMjoxOjA="
  )
  myHeaders.append("Accept", "application/json")
  myHeaders.append("Content-Type", "application/json")
  //myHeaders.append("Origin", "https://us-dany-blog.netlify.app")

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  }

  fetch("https://api.intercom.io/help_center/collections", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log("error", error))
}

// const bres = await fetch("https://api.intercom.io/articles?per_page=202", {
//   method: "GET",
//   mode: "cors",
//   cache: "no-cache",
//   credentials: "same-origin",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     Authorization:
//       "Bearer dG9rOjFkOGIzODRmXzEyY2ZfNDRjMV85NDg3Xzk3NDFjYTE3OGZmMjoxOjA=",
//   },
// })
//const collections = await res.json()

// const articles = await bres.json()
// By returning { props: { collections } }, the Blog component
// will receive `collections` as a prop at build time
//   return collections
// }

const PartnersPage = ({ data, location }) => {
  const frontmatter = data.markdownRemark.frontmatter
  const { sectionFAQ, path } = frontmatter

  //const data = awgetStaticProps()

  // const fetchWithToken = async (url, token) => {
  // const headers = new Headers()

  // // headers.append("Content-Type", "application/json")
  // headers.append("Accept", "application/json")
  // headers.append("Authorization", `Bearer ${token}`)

  // const response = await fetch(url, {
  //   method: "GET",
  //   headers,
  // })

  //   const response = await fetch(
  //     "https://api.intercom.io/help_center/collections",
  //     {
  //       method: "GET",
  //       mode: "cors",
  //       cache: "no-cache",
  //       credentials: "same-origin",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer dG9rOjFkOGIzODRmXzEyY2ZfNDRjMV85NDg3Xzk3NDFjYTE3OGZmMjoxOjA=`,
  //         Host: "api.intercom.io",
  //         // Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   )

  //   return response
  // }

  // const { data: collections } = useSWR(
  //   [
  //     "https://api.intercom.io/help_center/collections",
  //     "dG9rOjFkOGIzODRmXzEyY2ZfNDRjMV85NDg3Xzk3NDFjYTE3OGZmMjoxOjA=",
  //   ],
  //   fetchWithToken
  // )

  //console.log(collections)
  console.log(5)

  React.useEffect(() => {
    getStaticProps()
  })

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
