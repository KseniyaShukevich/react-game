import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
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
import HotKeysIcon from './HotkeysIcon';
import Statistics from './Statistics';
import Settings from './Settings';
import HotKeys from './HotKeys';
import Music from './Music';
import Sound from './Sound';
import maxScore from './maxScore';
import clearLocalStorage from './clearLocalStorage';
import timeObj from './timeObj';
import errorsObj from './errorsObj';
import statisticsObj from './statisticsObj';
import LayerPlay from './LayerPlay';
import Autoplay from './Autoplay';
import levelObj from './levelObj';

const useStyles = makeStyles((theme) => ({
  hiddenGame: {
    display: 'flex',
    alignItems: 'center',
    height: '500px',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  noHiddenGame: {
    display: 'flex',
    alignItems: 'center',
    height: '500px',
    width: '100%',
    position: 'relative',
  },
  containerGame: {
    minHeight: '91vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  containerNotLight: {
    display: 'flex',
    width: '100%',
    position: 'relative',
  },
  noGame: {
    zIndex: 5,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  loader: {
    zIndex: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'white',
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing(1)}px 0`,
  },
  containerIcons: {
    width: '20%',
    minWidth: 120,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    height: '45vw',
    maxHeight: '440px',
    position: 'relative',
  },
  middleBox: {
    height: '33vw',
    maxHeight: '320px',
    position: 'relative',
    margin: '80px 0',
  },
  bigBox: {
    height: '49vw',
    maxHeight: '480px',
    position: 'relative',
    paddingLeft: '8px',
  },
}));

const GridGame: React.FC = () => {
  const classes = useStyles();
  const [cards, setCards] = useState<Array<ICard>>(() => getNewCards());
  const [toggle, setToggle] = useState<boolean>(false);
  const [countSeconds, setCountSeconds] = useState<number>(() => timeObj.getSavedSeconds());
  const [isStatistics, setIsStatistics] = useState<boolean>(false);
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const [isHotKeys, setIsHotKeys] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<Array<IStatistics> | null>(null);
  const [errors, setErrors] = useState<number>(() => errorsObj.getSaved());
  const [isEndGame, setIsEndGame] = useState<boolean>(() => gameObj.getIsEndGame());
  const [isMusic, setIsMusic] = useState<boolean>(true);
  const [isSound, setIsSound] = useState<boolean>(true);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
  const [isAnimation, setIsAnimation] = useState<boolean>(false);
  const [toggleNewGame, setToggleNewGame] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(() => levelObj.get());
  const [isNewGame, setIsNewGame] = useState<boolean>(false);
  const [isKeydownGame, setIsKeydownGame] = useState<boolean>(false);
  const [toggleKey, setToggleKey] = useState<boolean>(false);
  const idIntervals = useRef<Array<any>>([]);
  const score = useRef<number>(maxScore);
  const inputElMusic = useRef(null);
  const inputElSound = useRef(null);
  const music = useRef(null);
  const sound = useRef(null);
  const count = useRef<number>(1);
  const currLevel = useRef<number>(level);
  const focusCard = useRef<number>(-1);
  const keypress = useRef(null);

  const addError = (): void => {
    setErrors((prev) => {
      errorsObj.save(prev + 1);
      score.current -= 10;
      return prev + 1;
    });
  };

  const startTime = (): void => {
    if (!idIntervals.current.length) {
      idIntervals.current.push(setInterval(() => {
        setCountSeconds((prev) => {
          if (count.current !== 0) timeObj.save(prev + 1);
          score.current -= 1;
          return prev + 1;
        });
      }, 1000));
    }
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
    let countCard: number = 0;

    cards.map((cardObj) => {
      if (cardObj.isOpen) {
        countCard += 1;
      }
      return cardObj;
    });

    if (countCard % 2 === 0) {
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
      idIntervals.current.forEach((interval) => clearInterval(interval));
      idIntervals.current = [];
    }
  };

  const getNewGame = (cb?: () => void): void => {
    score.current = maxScore;
    setIsEndGame(false);
    setIsAnimation(true);
    closeCards();
    clearSetInterval();
    setCountSeconds(0);
    setErrors(0);
    clearLocalStorage();
    setTimeout(() => {
      playAudio(sound.current);
      setCards(getNewCards());
      setToggleNewGame(!toggleNewGame);
      setToggle(!toggle);
      if (typeof cb === 'function') cb();
    }, 1050);
  };

  const getCountCorrectCard = (): number => {
    let countCorrectCard: number = 0;
    cards.map((cardObj) => {
      if (cardObj.isCorrect) {
        countCorrectCard += 1;
      }
      return cardObj;
    });
    return countCorrectCard;
  };

  const checkEndGame = (): void => {
    const countCorrectCard: number = getCountCorrectCard();
    if (countCorrectCard === cards.length) {
      clearSetInterval();
      setIsEndGame(true);
      setIsNewGame(false);
      if (count.current !== 0) {
        statisticsObj.save(score.current, countSeconds, errors, level);
        gameObj.saveIsEndGame();
      }
    }
  };

  const setInCorrectCard = (value: number): void => {
    cards.map((cardObj) => {
      if (cardObj.value === value) {
        cardObj.isCorrect = true;
      }
      return cardObj;
    });
    if (count.current !== 0) gameObj.save(cards);
    checkEndGame();
  };

  const closeOpenCards = (): void => {
    playAudio(sound.current);
    if (isPlay) {
      startTime();
      setIsNewGame(true);
    }
    setCards(cards.map((cardObj) => {
      cardObj.isOpen = false;
      return cardObj;
    }));
    if (count.current !== 0) gameObj.save(cards);
  };

  const saveCloseCards = (): void => {
    const newCards = cards.map((cardObj) => {
      const newObj: ICard = { ...cardObj, isOpen: false };
      return newObj;
    });
    if (count.current !== 0) gameObj.save(newCards);
  };

  const openCards = (): void => {
    playAudio(sound.current);
    setCards(cards.map((cardObj) => {
      cardObj.isOpen = true;
      return cardObj;
    }));
    saveCloseCards();
  };

  const checkCards = (value: number): void => {
    if (isCorrectCard(value)) {
      setInCorrectCard(value);
    } else {
      setTimeout(() => {
        addError();
        closeWrangCards();
      }, 1000);
    }
  };

  const cardClick = (isOpen: boolean, id: number, value: number) => {
    if (!isOpen) {
      setCardOpen(id);
      if (isEvenCardCount()) {
        checkCards(value);
      }
    }
  };

  const checkKeydown = (e: KeyboardEvent): void => {
    const { key } = e;

    if (!isKeydownGame
      && ((key === 'ArrowRight') || (key === 'ArrowDown') || (key === 'ArrowLeft') || (key === 'ArrowUp') || (key === 'Control'))) {
      keypress.current = key;
      setIsKeydownGame(true);
      setToggleKey((prev) => !prev);
    }
  };

  const doArrowRight = (): void => {
    focusCard.current = (focusCard.current + 1) % cards.length;
  };

  const doArrowLeft = (): void => {
    if (focusCard.current === -1) {
      focusCard.current = 0;
    } else {
      const newId: number = focusCard.current - 1;
      if (newId < 0) {
        focusCard.current = cards.length - 1;
      } else {
        focusCard.current = newId;
      }
    }
  };

  const doArrowUp = (): void => {
    if (focusCard.current === -1) {
      focusCard.current = 0;
    } else {
      const steps: Array<number> = [6, 8, 8];
      const newId: number = focusCard.current - steps[level];
      if (newId < 0) {
        focusCard.current = cards.length + focusCard.current - steps[level];
      } else {
        focusCard.current -= steps[level];
      }
    }
  };

  const doArrowDown = (): void => {
    if (focusCard.current === -1) {
      focusCard.current = 0;
    } else {
      const steps: Array<number> = [6, 8, 8];
      focusCard.current = (focusCard.current + steps[level]) % cards.length;
    }
  };

  const doClick = (): void => {
    const card: ICard = cards.find((item) => item.id === focusCard.current);
    cardClick(card.isOpen, card.id, card.value);
  };

  useEffect(() => {
    if (isKeydownGame && !isSettings && !isStatistics && !isHotKeys && !isEndGame && !isAutoplay) {
      if (keypress.current === 'ArrowRight') {
        doArrowRight();
      } else if (keypress.current === 'ArrowLeft') {
        doArrowLeft();
      } else if (keypress.current === 'ArrowUp') {
        doArrowUp();
      } else if (keypress.current === 'ArrowDown') {
        doArrowDown();
      } else if (keypress.current === 'Control') {
        doClick();
      }
    }
  }, [toggleKey]);

  useEffect(() => {
    window.addEventListener('keydown', checkKeydown);
  }, []);

  useEffect(() => {
    if (!idIntervals.current.length
      && !isStatistics && !isSettings
      && !isHotKeys && !isEndGame
      && isPlay && isNewGame) {
      startTime();
    }
  }, [isSettings, isStatistics, isHotKeys, isEndGame, isNewGame]);

  useEffect(() => {
    if (!isAutoplay && (isStatistics || isSettings || isHotKeys)) clearSetInterval();
  }, [isAutoplay, isSettings, isStatistics, isHotKeys]);

  useEffect(() => {
    if (isPlay) setIsLoading(true);
  }, [level]);

  useEffect(() => {
    const newLevel = levelObj.get();

    if (!isSettings && currLevel.current !== newLevel) {
      currLevel.current = newLevel;
      setLevel(newLevel);
      getNewGame();
    }
  }, [isSettings]);

  useEffect(() => {
    if (isPlay) {
      if (!gameObj.isSave() && !isEndGame && keypress.current !== 'Enter') {
        setIsAnimation(true);
        openCards();
        setTimeout(() => setIsLoading(false), 100);
        setTimeout(() => {
          closeOpenCards();
          setTimeout(() => {
            setIsAnimation(false);
          }, 1200);
        }, 4000);
      } else if (gameObj.isSave()) {
        if (!isEndGame && isPlay && !isStatistics && !isSettings && !isHotKeys) {
          setIsNewGame(true);
          startTime();
        }
      }
    } else if (gameObj.isSave()) {
      if (!isEndGame && isPlay && !isStatistics && !isSettings && !isHotKeys) {
        setIsNewGame(true);
        startTime();
      }
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
        <Container maxWidth="md" className={classes.containerGame}>
          <Menu
            count={count}
            isAnimation={isAnimation}
            isAutoplay={isAutoplay}
            errors={errors}
            countSeconds={countSeconds}
            getNewGame={getNewGame}
          />
          <div className={isLoading ? classes.hiddenGame : classes.noHiddenGame}>
            {isLoading && (
            <div className={classes.loader}>
              <img src="./Snake.gif" alt="loading" />
            </div>
            )}
            {
            (level === 0) ? (
              <Grid container spacing={1} className={classes.box}>
                {isEndGame && (
                <LayerEndGame
                  countSeconds={countSeconds}
                  errors={errors}
                />
                )}
                {isAutoplay && (<div className={classes.noGame} />)}
                {cards.map((card) => (
                  <Card
                    focusCard={focusCard}
                    isKeydownGame={isKeydownGame}
                    setIsKeydownGame={setIsKeydownGame}
                    toggleNewGame={toggleNewGame}
                    cardClick={cardClick}
                    value={card.value}
                    isOpen={card.isOpen}
                    id={card.id}
                    key={card.id}
                  />
                ))}
              </Grid>
            ) : (
              <div className={classes.containerNotLight}>
                {isEndGame && (
                  <LayerEndGame
                    countSeconds={countSeconds}
                    errors={errors}
                  />
                )}
                {isAutoplay && (<div className={classes.noGame} />)}
                <Grid container spacing={1} className={(level === 1) ? classes.middleBox : classes.bigBox}>
                  {cards.slice(0, cards.length / 2).map((card) => (
                    <Card
                      focusCard={focusCard}
                      isKeydownGame={isKeydownGame}
                      setIsKeydownGame={setIsKeydownGame}
                      toggleNewGame={toggleNewGame}
                      cardClick={cardClick}
                      value={card.value}
                      isOpen={card.isOpen}
                      id={card.id}
                      key={card.id}
                    />
                  ))}
                </Grid>
                <Grid container spacing={1} className={(level === 1) ? classes.middleBox : classes.bigBox}>
                  {cards.slice(cards.length / 2).map((card) => (
                    <Card
                      focusCard={focusCard}
                      isKeydownGame={isKeydownGame}
                      setIsKeydownGame={setIsKeydownGame}
                      toggleNewGame={toggleNewGame}
                      cardClick={cardClick}
                      value={card.value}
                      isOpen={card.isOpen}
                      id={card.id}
                      key={card.id}
                    />
                  ))}
                </Grid>
              </div>
            )
          }
          </div>
          <div className={classes.container}>
            <div className={classes.containerIcons}>
              <StatisticsIcon
                level={level}
                setStatistics={setStatistics}
                setIsStatistics={setIsStatistics}
              />
              <SettingsIcon
                setIsSettings={setIsSettings}
              />
              <HotKeysIcon
                setIsHotKeys={setIsHotKeys}
              />
            </div>
            <div>
              <Autoplay
                count={count}
                isAnimation={isAnimation}
                isAutoplay={isAutoplay}
                setIsAutoplay={setIsAutoplay}
                isEndGame={isEndGame}
                setIsEndGame={setIsEndGame}
                getNewGame={getNewGame}
                cards={cards}
                cardClick={cardClick}
              />
            </div>
          </div>
          <Statistics
            level={level}
            setStatistics={setStatistics}
            statistics={statistics}
            isStatistics={isStatistics}
            setIsStatistics={setIsStatistics}
          />
          <Settings
            isMusic={isMusic}
            isSound={isSound}
            setIsMusic={setIsMusic}
            setIsSound={setIsSound}
            isSettings={isSettings}
            setIsSettings={setIsSettings}
            inputElMusic={inputElMusic}
            inputElSound={inputElSound}
            music={music}
            sound={sound}
          />
          <HotKeys
            isHotKeys={isHotKeys}
            setIsHotKeys={setIsHotKeys}
          />
        </Container>
      </main>
    </>
  );
};

export default GridGame;
