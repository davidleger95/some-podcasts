import React from 'react';
import data from 'content/podcasts.yml';
import {
  Artwork,
  ArtworkWrapper,
  Content,
  ContentWrapper,
  CoverImage,
  CoverImageWrapper,
  Section,
  SectionHeader
} from 'components/styled';
import Wave from 'assets/wave.svg';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import slugify from 'utils/slugify';
import EpisodeReccomendation from 'components/EpisodeReccomendation';

const StyledWave = styled(Wave)<{ primaryColor: string; accentColor: string }>`
  --primary: ${(p) => p.primaryColor};
  --accent: ${(p) => p.accentColor};
  position: absolute;
  width: 100%;
  transform: translateY(calc(-100% + 1px));

  @media (max-width: 600px) {
    transform: translateY(calc(-100% + 5px)) scaleY(2);
    transform-origin: bottom;
  }

  @keyframes amplify {
    0% {
      transform: scaleY(0.75);
    }
    25% {
      transform: scaleY(0.6);
    }
    50% {
      transform: scaleY(0.8);
    }
    75% {
      transform: scaleY(0.6);
    }
    100% {
      transform: scaleY(1);
    }
  }

  path {
    transform-origin: bottom;
    animation: amplify 11s ease-in-out infinite alternate;

    &:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 7s;
    }
    &:nth-child(2) {
      animation-delay: -4s;
      animation-duration: 9s;
    }
  }
`;

const Podcasts = () => {
  return (
    <>
      {data.map(({ theme, coverImage, artwork, name, host, about, featuredEpisode }) => (
        <Section {...theme} key={name} id={slugify(name)}>
          <CoverImageWrapper>
            <CoverImage {...coverImage} layout="fill" />
          </CoverImageWrapper>
          <ContentWrapper>
            <StyledWave {...theme} />
            <Content>
              <SectionHeader>
                <ArtworkWrapper>
                  <Artwork src={artwork} width={200} height={200} />
                </ArtworkWrapper>
                <h2>{name}</h2>
                <h3>
                  <small>Hosted by</small> {host}
                </h3>
              </SectionHeader>
              <ReactMarkdown children={about}></ReactMarkdown>
              <EpisodeReccomendation {...featuredEpisode} />
            </Content>
          </ContentWrapper>
        </Section>
      ))}
    </>
  );
};

export default Podcasts;
