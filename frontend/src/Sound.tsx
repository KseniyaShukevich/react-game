import React, { useEffect } from 'react';
import audioObj from './audioObj';

interface IProps {
  sound: any
}

const Music: React.FC<IProps> = ({ sound }: IProps) => {
  const volumeSound: number = audioObj.get('sound');

  useEffect(() => {
    sound.current.volume = volumeSound;
  }, []);

  return (
    <audio
      ref={sound}
      src="./card.mp3"
      typeof="audio/mpeg"
    />
  );
};

export default Music;
