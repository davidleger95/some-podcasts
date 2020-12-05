import React, { FC } from 'react';

interface SpotifyEmbedProps {
  id: string;
}

const SpotifyEmbed: FC<SpotifyEmbedProps> = ({ id }) => {
  return (
    <iframe
      src={`https://open.spotify.com/embed-podcast/episode/${id}`}
      width="100%"
      frameBorder="0"
      allow="encrypted-media"></iframe>
  );
};

export default SpotifyEmbed;
