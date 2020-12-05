import { graphql } from 'gatsby';

const query = graphql`
  fragment FluidImage on File {
    childImageSharp {
      fluid(maxWidth: 200) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }

  query CoverArt {
    potterless: file(relativePath: { regex: "/potterless/" }) {
      ...FluidImage
    }
    anthropoceneReviewed: file(relativePath: { regex: "/anthropocene-reviewed/" }) {
      ...FluidImage
    }
    cautionaryTales: file(relativePath: { regex: "/cautionary-tales./" }) {
      ...FluidImage
    }
    reviewRevue: file(relativePath: { regex: "/review-revue./" }) {
      ...FluidImage
    }
    replyAll: file(relativePath: { regex: "/reply-all./" }) {
      ...FluidImage
    }
  }
`;

export default query;
