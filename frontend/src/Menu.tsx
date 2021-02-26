import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import timeObj from './timeObj';

const useStyles = makeStyles((theme) => ({
  menu: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing(2.7),
  },
}));

interface IProps {
  errors: number
  countSeconds: number
  getNewGame: () => void
}

const Menu: React.FC<IProps> = ({ errors, countSeconds, getNewGame }: IProps) => {
  const classes = useStyles();

  const minutes: number = timeObj.getMinutes(countSeconds);
  const seconds: string = timeObj.getSeconds(countSeconds);

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
      <div>
        <Typography variant="subtitle2">
          Errors:
          {' '}
          {errors}
        </Typography>
      </div>
      <Button variant="contained" color="primary" onClick={getNewGame}>New game</Button>
    </div>
  );
};

export default Menu;
