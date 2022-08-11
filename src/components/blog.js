import React from "react"
import { graphql } from "gatsby"
import Layout from "./layout"

class Blog extends React.Component {
  render() {
    const post = this.props.data.markdownRemark

    return (
      <Layout>
        <div>
          <h1>{post.frontmatter.title}</h1>
          <h2>By {post.frontmatter.author}</h2>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </Layout>
    )
  }
}

export default Blog

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(frontmatter: { slug: { eq: $id } }) {
      frontmatter {
        title
        author
      }
      html
    }
  }
`
