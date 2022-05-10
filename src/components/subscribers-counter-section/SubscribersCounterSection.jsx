import React from "react"
import { StaticQuery, graphql } from "gatsby"

const SubscribersCounterSection = () => (
  <StaticQuery
    query={graphql`
      query BlogPageQuery {
        markdownRemark(frontmatter: { layout: { eq: "post" } }) {
          frontmatter {
            countOfEmailSubscribers
          }
        }
      }
    `}
    render={data => (
      <section>
        <div>
          <div>
            {data?.markdownRemark?.frontmatter?.countOfEmailSubscribers}
          </div>
          <span>email subscribers</span>
        </div>
      </section>
    )}
  />
)

export default SubscribersCounterSection
