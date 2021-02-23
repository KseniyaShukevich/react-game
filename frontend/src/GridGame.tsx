import React, { useEffect } from 'react';
import {
  Container, Box, Typography, Grid,
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
  const cards: Array<ICard> = getNewCards();

  return (
    <main>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={1} className={classes.box}>
          {cards.map((card, index) => (
            <Card card={card.value} key={index} />
          ))}
        </Grid>
      </Container>
    </main>
  );
};

export default GridGame;
