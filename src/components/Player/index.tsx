import { AnimatePresence } from 'framer-motion';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';

const PlayerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: env(safe-area-inset-bottom);
  background: #000d;
  color: #fff;
  backdrop-filter: blur(5px);
  z-index: 10000;
  box-shadow: 0 0 1rem 0 #0008;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.5rem;

  padding: 1rem;
`;

const Button = styled.button`
  border-radius: 50%;
  border: none;
  height: 3.5em;
  width: 3.5em;
  padding: 0.25em;
  position: relative;
  background: #fff;
  display: block;
  --icon-color: #873dff;

  &:focus {
    outline: none;
  }

  &::before,
  &::after {
    --offset: 0.25em;
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    background: #fff8;
    transform: scale(1.15);
    z-index: -1;
    animation-name: pulse;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;

    @keyframes pulse {
      0% {
        transform: scale(0.8);
        opacity: 1;
      }

      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }
  }

  &::after {
    animation-delay: 1s;
  }
`;

const TimeDisplay = styled.time`
  display: block;

  .current {
  }

  .total {
    opacity: 0.5;
    /* font-size: 0.8em; */
  }
`;

const Progress = styled.progress`
  appearance: none;
  display: block;
  width: auto;
  height: 5px;
  overflow: visible;

  &::-webkit-progress-bar {
    background: #fff4;
  }
  &::-webkit-progress-value {
    background: linear-gradient(20deg, #a72db1, #873dff);
    /* border-top-right-radius: 5px;
    border-bottom-right-radius: 5px; */
    border-right: 5px solid #fff;
  }
`;

const playSvg = (
  <svg viewBox="0 0 20 20">
    <g style={{ fill: 'var(--icon-color)' }}>
      <polygon points="7,5,10,7,10,13,7,15">
        <animate
          className="play-animation"
          fill="freeze"
          begin="indefinite"
          attributeName="points"
          dur="150ms"
          to="6,5,9,5,9,15,6,15"
        />
        <animate
          className="pause-animation"
          fill="freeze"
          begin="indefinite"
          attributeName="points"
          dur="150ms"
          to="7,5,10,7,10,13,7,15"
        />
      </polygon>
      <polygon points="10,7, 15,10, 15,10, 10,13">
        <animate
          className="play-animation"
          fill="freeze"
          begin="indefinite"
          attributeName="points"
          dur="150ms"
          to="11,5, 14,5, 14,15, 11,15"
        />
        <animate
          className="pause-animation"
          fill="freeze"
          begin="indefinite"
          attributeName="points"
          dur="150ms"
          to="10,7, 15,10, 15,10, 10,13"
        />
      </polygon>
    </g>
  </svg>
);

interface PlayPauseButtonProps {
  audio: HTMLAudioElement;
  playState: PlayState;
}

const PlayPauseButton: FC<PlayPauseButtonProps> = ({ audio, playState }) => {
  useEffect(() => {
    if (playState === PlayState.Playing) {
      const animations = document.getElementsByClassName('play-animation') as HTMLCollectionOf<
        SVGAnimateElement
      >;
      (animations[0] as any).beginElement();
      (animations[1] as any).beginElement();
    } else if (playState === PlayState.Paused || playState === PlayState.Ended) {
      const animations = document.getElementsByClassName('pause-animation') as HTMLCollectionOf<
        SVGAnimateElement
      >;
      (animations[0] as any).beginElement();
      (animations[1] as any).beginElement();
    }
  }, [playState]);

  const togglePlayState = () => {
    if (playState !== PlayState.Playing) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return <Button onClick={togglePlayState}>{playSvg}</Button>;
};

const formatTime = (time: Date | null) => {
  if (time === null) {
    return '--:--';
  }

  return time.toLocaleTimeString([], { minute: 'numeric', second: '2-digit' });
};

enum PlayState {
  Playing = 'PLAYING',
  Paused = 'PAUSED',
  Ended = 'ENDED'
}

const useAudio = (src) => {
  const audio = useMemo(() => new Audio(src), [src]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date(0));
  const [duration, setDuration] = useState<Date>(null);
  const [playState, setPlayState] = useState<PlayState>(PlayState.Paused);

  useEffect(() => {
    const updateDuration = () => {
      setDuration(new Date(audio.duration * 1000));
    };

    const updateCurrentTime = () => {
      setCurrentTime(new Date(audio.currentTime * 1000));
    };

    const updatePlayState: EventListener = (e) => {
      if (e.type === 'play') {
        setPlayState(PlayState.Playing);
      } else if (e.type === 'pause') {
        setPlayState(PlayState.Paused);
      } else if (e.type === 'ended') {
        setPlayState(PlayState.Ended);
      }
    };

    audio.addEventListener('play', updatePlayState);
    audio.addEventListener('pause', updatePlayState);
    audio.addEventListener('ended', updatePlayState);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('timeupdate', updateCurrentTime);

    return () => {
      audio.removeEventListener('play', updatePlayState);
      audio.removeEventListener('pause', updatePlayState);
      audio.removeEventListener('ended', updatePlayState);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, [audio]);

  return {
    currentTime,
    duration,
    audio,
    playState
  };
};

interface PlayerProps {
  title: string;
  src: string;
}

const Player: FC<PlayerProps> = ({ title, src }) => {
  const { currentTime, duration, playState, audio } = useAudio(src);

  return (
    <PlayerWrapper>
      <Progress value={currentTime?.getTime()} max={duration?.getTime() || 0} />
      <Content>
        <PlayPauseButton playState={playState} audio={audio} />
        <div>{title}</div>
        <TimeDisplay>
          {formatTime(currentTime)} <span className="total"> / {formatTime(duration)}</span>
        </TimeDisplay>
      </Content>
    </PlayerWrapper>
  );
};

interface ClientPlayerProps {
  audio?: PlayerProps;
}

const ClientPlayer: FC<ClientPlayerProps> = ({ audio }) => {
  // Don't render server-side
  if (typeof window === 'undefined' || !audio) {
    return null;
  }

  return (
    <AnimatePresence>
      <Player {...audio} />
    </AnimatePresence>
  );
};

export default ClientPlayer;
