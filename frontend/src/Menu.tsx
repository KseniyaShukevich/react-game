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
    paddingBottom: theme.spacing(2),
  },
  text: {
    color: theme.palette.text.primary,
  },
}));

interface IProps {
  count: any
  isAnimation: boolean
  isAutoplay: boolean
  errors: number
  countSeconds: number
  getNewGame: () => void
}

const Menu: React.FC<IProps> = ({
  isAnimation, isAutoplay, errors,
  countSeconds, getNewGame, count,
}: IProps) => {
  const classes = useStyles();

  const minutes: number = timeObj.getMinutes(countSeconds);
  const seconds: string = timeObj.getSeconds(countSeconds);

  const handleClick = () => {
    count.current = 1;
    getNewGame();
  };

  return (
    <div className={classes.menu}>
      <div>
        <Typography variant="subtitle2" className={classes.text}>
          Time:
          {' '}
          {minutes}
          :
          {seconds}
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle2" className={classes.text}>
          Errors:
          {' '}
          {errors}
        </Typography>
      </div>
      {
        (isAnimation || isAutoplay) ? (
          <Button variant="contained" color="primary">New game</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleClick}>New game</Button>
        )
      }
    </div>
  );
};

export default Menu;
