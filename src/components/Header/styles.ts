import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledHeader = styled.header`
  display: grid;
  gap: 2rem;
  align-items: center;
  justify-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 1rem;
  overflow: hidden;
`;

export const CoverArtContainer = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  grid-auto-flow: column;
  width: 100%;
  max-width: 1000px;
  margin: 2rem;
`;

export const Title = styled(motion.h1)`
  font-size: clamp(4rem, 12vmin, 6rem);
  display: grid;
  margin: 0;
  line-height: 1;
  color: #873dc1;
  letter-spacing: 0.025em;

  small {
    font-size: 0.4em;
    color: #000;

    &:last-of-type {
      justify-self: end;
    }
  }
`;

export const GradientText = styled(motion.div)`
  color: transparent;
  background: linear-gradient(20deg, #a72db1, #873dff);
  -webkit-background-clip: text;
  background-clip: text;
  animation: hue 7s linear infinite alternate;

  @keyframes hue {
    0% {
      filter: hue-rotate(-10deg);
    }
    100% {
      filter: hue-rotate(10deg);
    }
  }
`;
