import React, { FC } from 'react';
import Image, { GatsbyImageFluidProps } from 'gatsby-image';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import { FluidImageFragment } from '../../types/graphql';

const Art = styled(Image)`
  display: block;
  height: clamp(4rem, 15vmin, 8rem);
  width: clamp(4rem, 15vmin, 8rem);
  border-radius: 0.5em;
  box-shadow: 0 0 2rem -0.5rem #000;

  &:nth-child(even) {
    transform: rotateZ(7deg);
  }

  &:nth-child(odd) {
    transform: rotateZ(-7deg);
  }
`;

const Wrapper = styled(motion.div)`
  &:nth-child(even) ${Art} {
    transform: rotateZ(5deg);
  }

  &:nth-child(odd) ${Art} {
    transform: rotateZ(-5deg);
  }
`;

const variants: Variants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const CoverArt: FC<{ image: FluidImageFragment; delay?: number }> = ({ image, delay = 0 }) => {
  return (
    <Wrapper variants={variants}>
      <motion.div
        animate={{
          rotate: [5 + delay, -5 + delay, 5 + delay],
          x: [5, -5, 5],
          y: [5 + delay, -5 + delay, 5 + delay],
        }}
        transition={{
          duration: 5 + delay,
          loop: Infinity,
          delay: delay * 2,
          type: 'keyframes',
        }}
      >
        <Art {...(image.childImageSharp as GatsbyImageFluidProps)} />
      </motion.div>
    </Wrapper>
  );
};

export default CoverArt;
