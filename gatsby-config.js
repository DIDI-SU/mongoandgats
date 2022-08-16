require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Books Plus`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    {
      resolve: "gatsby-source-mongodb",
      options: {
        dbName: "gatsby",
        collection: "books",
        server: {
          address: process.env.GATSBY_MONGO_ADDRESS,
          port: 27017,
        },
        auth: {
          user: process.env.GATSBY_MONGO_USER,
          password: process.env.GATSBY_MONGO_PASSWORD,
        },
        extraParams: {
          ssl: true,
          authSource: "admin",
          retryWrites: true,
        },
      },
    },
  ],
}
