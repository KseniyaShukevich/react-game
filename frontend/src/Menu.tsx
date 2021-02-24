import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container, Grid, Button, Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  menu: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '25px',
  },
}));

interface IProps {
  countSeconds: number
  getNewGame: () => void
}

const Menu: React.FC<IProps> = ({ getNewGame, countSeconds }: IProps) => {
  const classes = useStyles();

  const getMinutes = (count: number): number => {
    const res: number = Math.floor(count / 60);
    return res;
  };

  const getSeconds = (count: number): string => {
    const res = count % 60;
    if (res < 10) {
      return `0${res}`;
    }
    return `${res}`;
  };

  const minutes: number = getMinutes(countSeconds);
  const seconds: string = getSeconds(countSeconds);

  return (
    <div className={classes.menu}>
      <div>
        <Typography variant="subtitle2">
          Time:
          {' '}
          {minutes}
          :
          {seconds}
        </Typography>
      </div>
      <Button variant="contained" color="primary" onClick={getNewGame}>New game</Button>
    </div>
  );
};

export default Menu;
