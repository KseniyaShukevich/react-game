import React, { useState, useEffect } from 'react';
import {
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import levelObj from './levelObj';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    perspective: '1000px',
    height: '100%',
  },
  image: {
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      borderRadius: '3px',
    },
    [theme.breakpoints.up('sm')]: {
      borderRadius: '5px',
    },
    [theme.breakpoints.up('lg')]: {
      borderRadius: '7px',
    },
    boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
    transition: '0.3s',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.7)',
    },
  },
  imageFocus: {
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      borderRadius: '3px',
    },
    [theme.breakpoints.up('sm')]: {
      borderRadius: '5px',
    },
    [theme.breakpoints.up('lg')]: {
      borderRadius: '7px',
    },
    boxShadow: '0px 0px 6px rgba(250,0,0,0.9)',
    transition: '0.3s',
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
interface IProps {
  focusCard: any
  isKeydownGame: boolean
  toggleNewGame: boolean
  id: number
  value: number
  isOpen: boolean
  cardClick: (isOpen: boolean, id: number, value: number) => void
  setIsKeydownGame: (value: boolean) => void
}

const Card: React.FC<IProps> = ({
  focusCard,
  isKeydownGame,
  toggleNewGame,
  id,
  value,
  isOpen,
  cardClick,
  setIsKeydownGame,
}: IProps) => {
  const classes = useStyles();
  const [size, setSize] = useState<any>(2);

  const handleClick = () => {
    if (isKeydownGame) {
      setIsKeydownGame(false);
      focusCard.current = -1;
    };
    cardClick(isOpen, id, value);
  };

  useEffect(() => {
    const level = levelObj.get();
    if (level) {
      setSize(3);
    } else {
      setSize(2);
    }
  }, [toggleNewGame]);

  return (
    <Grid item xs={size}>
      <div className={classes.card}>
        <div className={!isOpen ? classes.frontInBack : classes.front}>
          <img className={(focusCard.current === id) ? classes.imageFocus : classes.image} src={`./${value}.jpg`} alt="card" />
        </div>
        <div className={!isOpen ? classes.backInFront : classes.back} onClick={handleClick}>
          <img className={(focusCard.current === id) ? classes.imageFocus : classes.image} src="./back.jpg" alt="card" />
        </div>
      </div>
    </Grid>
  );
};

export default Card;
