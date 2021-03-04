import React, { useEffect, useState } from 'react';
import {
  Typography,
} from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import timeObj from './timeObj';

const useStyles = makeStyles((theme) => ({
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
    background: fade(theme.palette.background.default, 0.8),
    transition: 'opacity 0.5s',
  },
  text: {
    color: theme.palette.text.primary,
    textAlign: 'center',
  },
}));
interface IProps {
  countSeconds: number
  errors: number
}

const LayerEndGame: React.FC<IProps> = ({ countSeconds, errors }: IProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const classes = useStyles();
  const minutes: number = timeObj.getMinutes(countSeconds);
  const seconds: string = timeObj.getSeconds(countSeconds);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 1000);
  }, []);

  return (
    <div className={isMounted ? classes.overlay : classes.overlayNone}>
      <Typography variant="h5" className={classes.text}>
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
