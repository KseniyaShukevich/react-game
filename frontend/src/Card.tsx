import React, { useState } from 'react';
import {
  Container, Box, Typography, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    perspective: '1000px',
    height: '100%',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
    boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
    transition: '0.3s',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.7)',
    },
  },
  front: {
    transition: '1s',
    backfaceVisibility: 'hidden',
    position: 'absolute',
  },
  back: {
    transform: 'rotateY(180deg)',
    transition: '1s',
    backfaceVisibility: 'hidden',
    position: 'absolute',
  },
  frontInBack: {
    transform: 'rotateY(180deg)',
    transition: '1s',
    backfaceVisibility: 'hidden',
    position: 'absolute',
  },
  backInFront: {
    transform: 'rotateY(360deg)',
    transition: '1s',
    backfaceVisibility: 'hidden',
    position: 'absolute',
  },
}));

type Props = {
  card: number,
};

const Card: React.FC<Props> = ({ card }) => {
  const classes = useStyles();
  const [isOtherSide, setIsOtherSide] = useState<boolean>(false);

  const handleClick = () => {
    setIsOtherSide(!isOtherSide);
  };

  return (
    <Grid item xs={2}>
      <div className={classes.card}>
        <div className={isOtherSide ? classes.frontInBack : classes.front} onClick={handleClick}>
          <img className={classes.image} src={`./${card}.jpg`} alt="card" />
        </div>
        <div className={isOtherSide ? classes.backInFront : classes.back} onClick={handleClick}>
          <img className={classes.image} src="./back.jpg" alt="card" />
        </div>
      </div>
    </Grid>
  );
};

export default Card;
