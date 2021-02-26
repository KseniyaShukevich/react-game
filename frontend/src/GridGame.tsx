import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LayerEndGame from './LayerEndGame';
import Card from './Card';
import Menu from './Menu';
import getNewCards from './getNewCards';
import ICard from './ICard';
import saveGame from './saveGame';
import isSaveGame from './isSaveGame';
import idLocalStorage from './idLocalStorage';
import getSavedSeconds from './savedSeconds';
import getSavedErrors from './savedErrors';
import getIsEndGame from './getIsEndGame';
import StatisticsIcon from './StatisticsIcon';
import Statistics from './Statistics';
import maxScore from './maxScore';
import IStatistics from './IStatistics';

const useStyles = makeStyles((theme) => ({
  containerGame: {
    minHeight: '91vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px 0`,
  },
  box: {
    height: '46vw',
    maxHeight: '595px',
    position: 'relative',
  },
}));

const GridGame: React.FC = () => {
  const classes = useStyles();
  const [cards, setCards] = useState<Array<ICard>>(() => getNewCards());
  const [toggle, setToggle] = useState<boolean>(false);
  const [countSeconds, setCountSeconds] = useState<number>(() => getSavedSeconds());
  const [isStatistics, setIsStatistics] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<Array<IStatistics> | null>(null);
  const [errors, setErrors] = useState<number>(() => getSavedErrors());
  const [isEndGame, setIsEndGame] = useState<boolean>(() => getIsEndGame());
  const idIntervals = useRef<Array<any>>([]);
  const score = useRef<number>(maxScore);

  const addError = (): void => {
    setErrors((prev) => {
      localStorage.setItem(`${idLocalStorage}errors`, `${prev + 1}`);
      score.current -= 10;
      return prev + 1;
    });
  };

  const startTime = (): void => {
    idIntervals.current.push(setInterval(() => {
      setCountSeconds((prev) => {
        localStorage.setItem(`${idLocalStorage}seconds`, `${prev + 1}`);
        score.current -= 1;
        return prev + 1;
      });
    }, 1000));
  };

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

  const closeWrangCards = (): void => {
    setCards(cards.map((cardObj) => {
      if (!cardObj.isCorrect) {
        cardObj.isOpen = false;
      }
      return cardObj;
    }));
  };

  const closeCards = (): void => {
    setCards(cards.map((cardObj) => {
      if (cardObj.isOpen) {
        cardObj.isOpen = false;
      }
      return cardObj;
    }));
  };

  const clearSetInterval = (): void => {
    if (idIntervals.current.length > 0) {
      clearInterval(idIntervals.current[0]);
      idIntervals.current.shift();
    }
  };

  const clearLocalStorage = (): void => {
    localStorage.removeItem(`${idLocalStorage}cards`);
    localStorage.removeItem(`${idLocalStorage}seconds`);
    localStorage.removeItem(`${idLocalStorage}errors`);
  };

  const getNewGame = (): void => {
    localStorage.removeItem(`${idLocalStorage}isEndGame`);
    score.current = maxScore;
    setIsEndGame(false);
    closeCards();
    clearSetInterval();
    setCountSeconds(0);
    setErrors(0);
    clearLocalStorage();
    setTimeout(() => {
      setCards(getNewCards());
      setToggle(!toggle);
    }, 1100);
  };

  const clearRating = (array: Array<IStatistics>) => {
    const buff: Array<number> = [];
    const res: Array<IStatistics | null> = array.map((item: IStatistics) => {
      if (!buff.includes(item.score)) {
        buff.push(item.score);
        return item;
      }
      return null;
    });

    const newArray: Array<IStatistics> = res.filter((item) => item !== null);
    return newArray;
  };

  const saveStatistics = (): void => {
    const savedStatistics: string = localStorage.getItem(`${idLocalStorage}statistics`);
    const newStatistics: IStatistics = {
      score: score.current,
      countSeconds,
      errors,
    };
    if (savedStatistics) {
      const arrayStatistics: Array<IStatistics> = JSON.parse(savedStatistics);
      arrayStatistics.push(newStatistics);
      arrayStatistics.sort((a, b) => b.score - a.score);
      const newArrayStatistics: Array<IStatistics> = clearRating(arrayStatistics);
      localStorage.setItem(`${idLocalStorage}statistics`, JSON.stringify(newArrayStatistics.slice(0, 10)));
    } else {
      localStorage.setItem(`${idLocalStorage}statistics`, JSON.stringify([newStatistics]));
    }
  };

  const checkEndGame = (): void => {
    let countCorrectCard: number = 0;
    cards.map((cardObj) => {
      if (cardObj.isCorrect) {
        countCorrectCard += 1;
      }
      return cardObj;
    });
    if (countCorrectCard === cards.length) {
      clearSetInterval();
      setIsEndGame(true);
      saveStatistics();
      localStorage.setItem(`${idLocalStorage}isEndGame`, '1');
    }
  };

  const setInCorrectCard = (value: number): void => {
    cards.map((cardObj) => {
      if (cardObj.value === value) {
        cardObj.isCorrect = true;
      }
      return cardObj;
    });
    saveGame(cards);
    checkEndGame();
  };

  const closeOpenCards = (): void => {
    setTimeout(() => {
      saveGame(cards);
      startTime();
      setCards(cards.map((cardObj) => {
        cardObj.isOpen = false;
        return cardObj;
      }));
    }, 4000);
  };

  const addSavedGame = (): void => {
    if (!isEndGame) {
      startTime();
    }
    setCards(cards.map((cardObj) => {
      if (!cardObj.isCorrect) {
        cardObj.isOpen = false;
      }
      return cardObj;
    }));
  };

  useEffect(() => {
    if (!isSaveGame()) {
      closeOpenCards();
    } else {
      addSavedGame();
    }
  }, [toggle]);

  return (
    <main>
      <Container maxWidth="lg" className={classes.containerGame}>
        <Menu
          errors={errors}
          countSeconds={countSeconds}
          getNewGame={getNewGame}
        />
        <Grid container spacing={1} className={classes.box}>
          {isEndGame && (
            <LayerEndGame
              countSeconds={countSeconds}
              errors={errors}
            />
          )}
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
              addError={addError}
              key={card.id}
            />
          ))}
        </Grid>
        <div className={classes.container}>
          <StatisticsIcon
            setStatistics={setStatistics}
            setIsStatistics={setIsStatistics}
            clearSetInterval={clearSetInterval}
          />
        </div>
        <Statistics
          statistics={statistics}
          isStatistics={isStatistics}
          setIsStatistics={setIsStatistics}
          startTime={startTime}
        />
      </Container>
    </main>
  );
};

export default GridGame;
