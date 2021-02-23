import React, { useState, useEffect } from 'react';
import {
  Container, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card';
import getNewCards from './getNewCards';
import ICard from './ICard';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '91vh',
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  box: {
    height: '46vw',
    maxHeight: '595px',
  },
}));

const GridGame: React.FC = () => {
  const classes = useStyles();
  const [cards, setCards] = useState<Array<ICard>>(() => getNewCards());

  const setCardOpen = (id: number): void => {
    let countOpenCard: number = 0;

    setCards(cards.map((cardObj) => {
      if ((cardObj.id === id) && (countOpenCard === 0) && (!cardObj.isOpen)) {
        cardObj.isOpen = true;
        countOpenCard += 1;
      }
      return cardObj;
    }));
  };

  const isEvenCardCount = (): boolean => {
    let count: number = 0;

    cards.map((cardObj) => {
      if (cardObj.isOpen) {
        count += 1;
      }
      return cardObj;
    });

    if (count % 2 === 0) {
      return true;
    }
    return false;
  };

  const isCorrectCard = (value: number): boolean => {
    let countOneCard: number = 0;

    cards.map((cardObj) => {
      if (cardObj.isOpen) {
        if (cardObj.value === value) {
          countOneCard += 1;
        }
      }
      return cardObj;
    });

    if (countOneCard === 2) {
      return true;
    }
    return false;
  };

  const setInCorrectCard = (value: number): void => {
    cards.map((cardObj) => {
      if (cardObj.value === value) {
        cardObj.isCorrect = true;
      }
      return cardObj;
    });
  };

  const closeWrangCards = (): void => {
    setCards(cards.map((cardObj) => {
      if (!cardObj.isCorrect) {
        cardObj.isOpen = false;
      }
      return cardObj;
    }));
  };

  useEffect(() => {
    setTimeout(() => setCards(cards.map((cardObj) => {
      cardObj.isOpen = false;
      return cardObj;
    })), 5000);
  }, []);

  return (
    <main>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={1} className={classes.box}>
          {cards.map((card) => (
            <Card
              value={card.value}
              isOpen={card.isOpen}
              id={card.id}
              setCardOpen={setCardOpen}
              isEvenCardCount={isEvenCardCount}
              isCorrectCard={isCorrectCard}
              setInCorrectCard={setInCorrectCard}
              closeWrangCards={closeWrangCards}
              key={card.id}
            />
          ))}
        </Grid>
      </Container>
    </main>
  );
};

export default GridGame;
