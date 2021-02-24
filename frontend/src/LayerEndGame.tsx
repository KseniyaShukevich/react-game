import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container, Grid, Button, Typography,
} from '@material-ui/core';
import getMinutes, { getSeconds } from './time';

const useStyles = makeStyles((theme) => ({
  overlay: {
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
  },
  text: {
    textAlign: 'center',
  },
}));

interface IProps {
  countSeconds: number
  errors: number
}

const LayerEndGame: React.FC<IProps> = ({ countSeconds, errors }: IProps) => {
  const classes = useStyles();
  const minutes: number = getMinutes(countSeconds);
  const seconds: string = getSeconds(countSeconds);

  return (
    <div className={classes.overlay}>
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
