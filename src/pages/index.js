import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const IndexPage = props => {
  const books = props.data.allMongodbGatsbyBooks.edges
  console.log(books)

  return (
    <Layout>
      <Layout>
        <div className="book-container">
          {books &&
            books.map(book => {
              const { id, title, shortDescription, thumbnailUrl } = book.node
              return (
                <div className="book">
                  {thumbnailUrl && (
                    <Link to={"/book/" + id}>
                      <img src={thumbnailUrl} />
                    </Link>
                  )}
                </div>
              )
            })}
        </div>
      </Layout>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMongodbGatsbyBooks {
      edges {
        node {
          id
          title
          shortDescription
          thumbnailUrl
        }
      }
    }
  }
`
