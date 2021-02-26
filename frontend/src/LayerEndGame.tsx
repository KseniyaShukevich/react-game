import React, { useEffect, useState } from 'react';
import {
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import getMinutes, { getSeconds } from './time';

const useStyles = makeStyles(() => ({
  overlayNone: {
    zIndex: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  overlay: {
    opacity: 1,
    zIndex: 20,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: 'rgba(255, 255, 255, 0.8)',
    transition: 'opacity 1s',
  },
}));
interface IProps {
  countSeconds: number
  errors: number
}

const LayerEndGame: React.FC<IProps> = ({ countSeconds, errors }: IProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const classes = useStyles();
  const minutes: number = getMinutes(countSeconds);
  const seconds: string = getSeconds(countSeconds);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 1000);
  }, []);

  return (
    <div className={isMounted ? classes.overlay : classes.overlayNone}>
      <Typography variant="h5" style={{ textAlign: 'center' }}>
        Passed for
        {' '}
        {minutes}
        :
        {seconds}
        {' '}
        and made
        {' '}
        {errors}
        {' '}
        mistakes
      </Typography>
    </div>
  );
};

export default LayerEndGame;
