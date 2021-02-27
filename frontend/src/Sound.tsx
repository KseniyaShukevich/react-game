import React from 'react';

interface IProps {
  sound: any
}

const Music: React.FC<IProps> = ({ sound }: IProps) => (
  <>
    <audio
      ref={sound}
      src="./card.mp3"
      typeof="audio/mpeg"
    />
  </>
);

export default Music;
