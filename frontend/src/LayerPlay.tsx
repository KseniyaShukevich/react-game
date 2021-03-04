import React, { useState } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import {
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  overlayNone: {
    opacity: 0,
    zIndex: 30,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: fade(theme.palette.background.default, 0.9),
    transition: 'opacity 0.5s',
  },
  overlay: {
    opacity: 1,
    zIndex: 30,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: fade(theme.palette.background.default, 0.9),
    transition: 'opacity 0.5s',
  },
}));

interface IProps {
  music: any
  setIsPlay: (value: boolean) => void
}

const LayerPlay: React.FC<IProps> = ({ music, setIsPlay }: IProps) => {
  const classes = useStyles();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const handleClick = (): void => {
    music.current.play();
    setIsMounted(true);
    setTimeout(() => setIsPlay(true), 500);
  };

  return (
    <div className={isMounted ? classes.overlayNone : classes.overlay}>
      <Button variant="contained" color="primary" onClick={handleClick}>play</Button>
    </div>
  );
};

export default LayerPlay;
