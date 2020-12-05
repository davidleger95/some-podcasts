module.exports = {
  siteMetadata: {
    site: `some-podcasts`,
    title: `Some Podcasts I Listen To`,
    titleTemplate: `%s - dave.js`,
    description: `A collection of podcasts I listen to regularly.`,
    siteUrl: `https://gatsby-starter-gnonce.netlify.com/`,
    language: `en`,
    color: `#003580`,
    twitter: '_davejs',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: `${__dirname}/src/content/images/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Some Podcasts I Listen To`,
        short_name: `Some Podcasts`,
        start_url: `/`,
        // background_color: `#003580`,
        // theme_color: `#003580`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
        include_favicon: true,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Montserrat:ital,wght@0,900;1,900`],
        display: 'swap',
      },
    },
  ],
};
