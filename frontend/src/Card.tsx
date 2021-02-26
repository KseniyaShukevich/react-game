import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
interface IProps {
  id: number
  value: number
  isOpen: boolean
  setCardOpen: (value: number) => void
  isEvenCardCount: () => boolean
  isCorrectCard: (value: number) => boolean
  setInCorrectCard: (value: number) => void
  closeWrangCards: () => void
  addError: () => void
}

const Card: React.FC<IProps> = ({
  id,
  value,
  isOpen,
  setCardOpen,
  isEvenCardCount,
  isCorrectCard,
  setInCorrectCard,
  closeWrangCards,
  addError,
}: IProps) => {
  const classes = useStyles();

  const checkCards = (): void => {
    if (isCorrectCard(value)) {
      setInCorrectCard(value);
    } else {
      setTimeout(() => {
        addError();
        closeWrangCards();
      }, 1000);
    }
  };

  const handleClick = () => {
    if (!isOpen) {
      setCardOpen(id);
      if (isEvenCardCount()) {
        checkCards();
      }
    }
  };

  return (
    <Grid item xs={2}>
      <div className={classes.card}>
        <div className={!isOpen ? classes.frontInBack : classes.front} onClick={handleClick}>
          <img className={classes.image} src={`./${value}.jpg`} alt="card" />
        </div>
        <div className={!isOpen ? classes.backInFront : classes.back} onClick={handleClick}>
          <img className={classes.image} src="./back.jpg" alt="card" />
        </div>
      </div>
    </Grid>
  );
};

export default Card;
