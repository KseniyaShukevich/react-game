import React from 'react';

interface IProps {
  music: any
}

const Music: React.FC<IProps> = ({ music }: IProps) => (
  <>
    <audio
      ref={music}
      src="./music.mp3"
      typeof="audio/mpeg"
      autoPlay
      loop
    />
  </>
);

export default Music;
