import SpotifyEmbed from 'components/SpotifyEmbed';
import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';

interface EpisodeReccomendationProps {
  id: string;
  title: string;
  description: string;
}

const EpisodeReccomendation: FC<EpisodeReccomendationProps> = ({ id, title, description }) => {
  return (
    <>
      <hr />
      <h3>
        <small>Episode Reccomendation</small>
        {title}
      </h3>
      <ReactMarkdown children={description} />
      <SpotifyEmbed id={id} />
    </>
  );
};

export default EpisodeReccomendation;
