import React, { useEffect } from 'react';
import audioObj from './audioObj';

interface IProps {
  music: any
}

const Music: React.FC<IProps> = ({ music }: IProps) => {
  const volumeMusic: number = audioObj.get('Music');

  useEffect(() => {
    music.current.volume = volumeMusic;
  }, []);

  return (
    <>
    <audio
      ref={music}
      src="./music.mp3"
      loop
    />
  </>
  );
};

export default Music;
