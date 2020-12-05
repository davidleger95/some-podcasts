import styled from 'styled-components';
import Image from 'next/image';

interface SectionProps {
  primaryColor: string;
  accentColor: string;
  textColor: string;
}

export const ContentWrapper = styled.div`
  width: 100%;
  z-index: 10;
  position: relative;
  background-color: var(--primary);
`;
export const Content = styled.div`
  max-width: 700px;
  margin: auto;
  padding: 2rem;
  color: var(--text);

  h2 {
    font-size: clamp(3rem, 10vw, 5rem);
    margin: 0;
    text-align: center;
    color: var(--accent);
  }

  h3 {
    margin: 0;

    small {
      display: block;
      color: var(--accent);
      margin-bottom: 0.5em;
    }
  }

  hr {
    border: 0;
    height: 5px;
    border-radius: 10px;
    background: var(--accent);
    width: 2rem;
    margin: 2.5rem auto;
  }

  & > p {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.4;

    font-size: 1.2rem;

    :first-of-type::first-letter {
      font-family: 'Bebas Neue', sans-serif;
      /* font-family: 'Bangers', cursive; */
      font-size: 5.1em;
      display: block;
      float: left;
      margin-right: 0.1em;
      line-height: 1;
      margin-top: -0.05em;
      margin-bottom: -0.25em;
      color: var(--accent);
    }
  }

  blockquote {
    display: block;
    float: right;
    width: clamp(180px, 50vw, 420px);
    margin: 0.75em 1em;
    padding: 0;
    margin-right: -25%;
    color: var(--accent);
    font-size: 2rem;
    font-style: italic;
    display: grid;
    grid-auto-flow: column;
    align-items: stretch;

    @media (max-width: 1000px) {
      margin-right: -10%;
    }

    @media (max-width: 800px) {
      margin-right: 0;
      font-size: 1.5rem;
    }

    @media (max-width: 450px) {
      margin-right: 0;
      width: 100%;
    }

    &::before {
      content: '';
      display: block;
      background: var(--accent);
      width: 5px;
      border-radius: 25px;
    }

    p {
      margin: 0.5rem 0 0.5rem 1em;
      line-height: 1.2;
    }
  }
`;

export const Section = styled.section<SectionProps>`
  --primary: ${(p) => p.primaryColor};
  --accent: ${(p) => p.accentColor};
  --text: ${(p) => p.textColor};
`;

export const SectionHeader = styled.header`
  text-align: center;
  display: grid;
  gap: 1rem;
  margin-bottom: 4rem;
`;

export const CoverImageWrapper = styled.div`
  height: clamp(10rem, calc(5rem + 60vmin), calc(5rem + 70vh));
  width: 100vw;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 0;
`;

export const CoverImage: typeof Image = styled(Image)`
  object-fit: cover;
  object-position: top;
`;

export const Artwork: typeof Image = styled(Image)`
  display: block;
  border-radius: 0.75rem;
`;

export const ArtworkWrapper = styled.div`
  margin: auto;
  width: clamp(8rem, 30vw, 12rem);
  margin-top: calc(-120px - 5vw);
  transform: rotateZ(7deg);
  margin-bottom: 3rem;
  filter: drop-shadow(0 0 1rem #0008);
`;
