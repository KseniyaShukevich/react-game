import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LayerEndGame from './LayerEndGame';
import Card from './Card';
import Menu from './Menu';
import getNewCards from './getNewCards';
import ICard from './ICard';
import IStatistics from './IStatistics';
import gameObj from './gameObj';
import StatisticsIcon from './StatisticsIcon';
import SettingsIcon from './SettingsIcon';
import Statistics from './Statistics';
import Settings from './Settings';
import Music from './Music';
import Sound from './Sound';
import maxScore from './maxScore';
import clearLocalStorage from './clearLocalStorage';
import timeObj from './timeObj';
import errorsObj from './errorsObj';
import statisticsObj from './statisticsObj';
import LayerPlay from './LayerPlay';

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
    // display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    padding: `${theme.spacing(1)}px 0`,
  },
  containerIcons: {
    width: '10%',
    minWidth: 100,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  const [countSeconds, setCountSeconds] = useState<number>(() => timeObj.getSavedSeconds());
  const [isStatistics, setIsStatistics] = useState<boolean>(false);
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<Array<IStatistics> | null>(null);
  const [errors, setErrors] = useState<number>(() => errorsObj.getSaved());
  const [isEndGame, setIsEndGame] = useState<boolean>(() => gameObj.getIsEndGame());
  const [isMusic, setIsMusic] = useState<boolean>(true);
  const [isSound, setIsSound] = useState<boolean>(true);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const idIntervals = useRef<Array<any>>([]);
  const score = useRef<number>(maxScore);
  const inputElMusic = useRef(null);
  const inputElSound = useRef(null);
  const music = useRef(null);
  const sound = useRef(null);

  const addError = (): void => {
    setErrors((prev) => {
      errorsObj.save(prev + 1);
      score.current -= 10;
      return prev + 1;
    });
  };

  const startTime = (): void => {
    idIntervals.current.push(setInterval(() => {
      setCountSeconds((prev) => {
        timeObj.save(prev + 1);
        score.current -= 1;
        return prev + 1;
      });
    }, 1000));
  };

  const playAudio = (el: HTMLAudioElement): void => {
    if (el) {
      el.currentTime = 0;
      el.play();
    }
  };

  const setCardOpen = (id: number): void => {
    let countOpenCard: number = 0;

    playAudio(sound.current);
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
        playAudio(sound.current);
        cardObj.isOpen = false;
      }
      return cardObj;
    }));
  };

  const closeCards = (): void => {
    const openCard = cards.find((card) => card.isOpen);
    if (openCard) {
      playAudio(sound.current);
    }
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

  const getNewGame = (): void => {
    score.current = maxScore;
    setIsEndGame(false);
    closeCards();
    clearSetInterval();
    setCountSeconds(0);
    setErrors(0);
    clearLocalStorage();
    setTimeout(() => {
      playAudio(sound.current);
      setCards(getNewCards());
      setToggle(!toggle);
    }, 1100);
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
      statisticsObj.save(score.current, countSeconds, errors);
      gameObj.saveIsEndGame();
    }
  };

  const setInCorrectCard = (value: number): void => {
    cards.map((cardObj) => {
      if (cardObj.value === value) {
        cardObj.isCorrect = true;
      }
      return cardObj;
    });
    gameObj.save(cards);
    checkEndGame();
  };

  const closeOpenCards = (): void => {
    setTimeout(() => {
      gameObj.save(cards);
      playAudio(sound.current);
      startTime();
      setCards(cards.map((cardObj) => {
        cardObj.isOpen = false;
        return cardObj;
      }));
    }, 4000);
  };

  const addSavedGame = (): void => {
    if (!isEndGame && isPlay) {
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
    if (!gameObj.isSave()) {
      closeOpenCards();
    } else {
      addSavedGame();
    }
  }, [toggle, isPlay]);

  return (
    <>
      {!isPlay && (
      <LayerPlay
        music={music}
        setIsPlay={setIsPlay}
      />
      )}
      <main>
        <Music music={music} />
        <Sound sound={sound} />
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
            <div className={classes.containerIcons}>
              <StatisticsIcon
                setStatistics={setStatistics}
                setIsStatistics={setIsStatistics}
                clearSetInterval={clearSetInterval}
              />
              <SettingsIcon
                setIsSettings={setIsSettings}
                clearSetInterval={clearSetInterval}
              />
            </div>
          </div>
          <Statistics
            isEndGame={isEndGame}
            statistics={statistics}
            isStatistics={isStatistics}
            setIsStatistics={setIsStatistics}
            startTime={startTime}
          />
          <Settings
            isMusic={isMusic}
            isSound={isSound}
            setIsMusic={setIsMusic}
            setIsSound={setIsSound}
            isEndGame={isEndGame}
            isSettings={isSettings}
            setIsSettings={setIsSettings}
            startTime={startTime}
            inputElMusic={inputElMusic}
            inputElSound={inputElSound}
            music={music}
            sound={sound}
          />
        </Container>
      </main>
    </>
  );
};

export default GridGame;
