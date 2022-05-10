import React from "react"
import { StaticQuery, graphql } from "gatsby"
import CountUp from "react-countup"

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
            <CountUp
              start={0}
              end={data?.markdownRemark?.frontmatter?.countOfEmailSubscribers}
              duration={5}
              separator=","
            />
          </div>
          <span>email subscribers</span>
        </div>
      </section>
    )}
  />
)

export default SubscribersCounterSection
