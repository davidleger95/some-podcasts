import React, { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Variants } from 'framer-motion';
import CoverArt from '../CoverArt';
import { CoverArtQuery } from '../../types/graphql';

import { CoverArtContainer, StyledHeader } from './styles';
import SiteTitle from './SiteTitle';

const variants: Variants = {
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
      delay: i,
    },
  }),
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

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

const Header: FC = () => {
  const images = useStaticQuery<CoverArtQuery>(query);

  return (
    <StyledHeader>
      <CoverArtContainer initial="hidden" animate="visible" variants={variants} custom={0.25}>
        {images.potterless && <CoverArt image={images.potterless} delay={0.5} />}
        {images.cautionaryTales && <CoverArt image={images.cautionaryTales} delay={0.75} />}
        {images.anthropoceneReviewed && <CoverArt image={images.anthropoceneReviewed} delay={0.25} />}
      </CoverArtContainer>
      <SiteTitle />

      <CoverArtContainer initial="hidden" animate="visible" variants={variants} custom={0.25}>
        {images.reviewRevue && <CoverArt image={images.reviewRevue} delay={0.6} />}
        {images.replyAll && <CoverArt image={images.replyAll} delay={0.9} />}
        {images.anthropoceneReviewed && <CoverArt image={images.anthropoceneReviewed} />}
      </CoverArtContainer>

      {/* 
      <Author initial="hidden" animate="visible" variants={list} custom={3}>
        <code style={{ fontStyle: 'italic' }}>
          made with <span style={{ color: 'hotpink' }}>&#10084;</span> by
        </code>
        <Logo src="/davejs-logo.svg" alt="dave.js" />
      </Author> */}
    </StyledHeader>
  );
};

export default Header;
