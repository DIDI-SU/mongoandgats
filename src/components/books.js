import React from "react"
import { graphql } from "gatsby"
import Layout from "./layout"

const Books = ({ data }) => {
  const book = data.mongodbGatsbyBooks
  const { title, isbn, thumbnailUrl, longDescription, publishedDate } = book
  const { authors, categories } = book
  return (
    <Layout>
      <div>
        <img src={thumbnailUrl} />
        <h1>{title}</h1>
        <p>
          By
          {authors.map(author => (
            <span>{author}, </span>
          ))}
        </p>
        <p>{longDescription}</p>
        <p>
          Published: {publishedDate} | ISBN: {isbn}
        </p>
        {categories.map(category => category)}
      </div>
    </Layout>
  )
}

export default Books

export const pageQuery = graphql`
  query MyQuery($id: String) {
    mongodbGatsbyBooks(id: { eq: $id }) {
      id
      title
      longDescription
      thumbnailUrl
      isbn
      pageCount
      publishedDate(formatString: "MMMM DD, YYYY")
      categories
      authors
    }
  }
`
