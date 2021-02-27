import React from 'react';

interface IProps {
  music: any
}

const Music: React.FC<IProps> = ({ music }: IProps) => (
  <>
    <audio
      ref={music}
      src="./music.mp3"
      loop
    />
  </>
);

export default Music;
