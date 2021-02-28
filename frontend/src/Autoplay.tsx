import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@material-ui/core';
import getRandomNumber from './getRandomNumber';
import ICard from './ICard';

interface IProps {
  isAutoplay: boolean
  setIsAutoplay: (value: boolean) => void
  isEndGame: boolean
  setIsEndGame: (value: boolean) => void
  cards: Array<ICard>
  getNewGame: (cb?: () => void) => void
  cardClick: (isOpen: boolean, id: number, value: number) => void
}

const Autoplay: React.FC<IProps> = ({
  isAutoplay, setIsAutoplay, isEndGame, setIsEndGame, cards, getNewGame, cardClick,
}: IProps) => {
  const buffCards = useRef<Array<number>>([]);
  const [counter, setCounter] = useState<number>(0);
  const savedCounter = useRef<number>(-1);

  const getCorrectCard = (): ICard => {
    const correctCard = cards.find((item) => (item.value === buffCards.current[0]) && !item.isOpen);
    return correctCard;
  };

  const getFortuneCard = (): ICard => {
    const fortuneCard = cards.find((item) => (item.value === buffCards.current[0]));
    return fortuneCard;
  };

  const autoplay = (): void => {
    if (buffCards.current.length) {
      const numberFunc: number = getRandomNumber(2);
      const newCard: ICard = numberFunc ? getCorrectCard() : getFortuneCard();
      if (newCard) {
        buffCards.current.pop();
        cardClick(newCard.isOpen, newCard.id, newCard.value);
      }
    } else {
      const closeCards = cards.filter((item) => !item.isOpen);
      const index: number = getRandomNumber(closeCards.length);
      const card: ICard = closeCards[index];
      buffCards.current.push(card.value);
      cardClick(card.isOpen, card.id, card.value);
    }
  };

  const handleClick = (): void => {
    getNewGame(() => {
      setIsAutoplay(true);
      setIsEndGame(false);
    });
  };

  useEffect(() => {
    if (isAutoplay && !isEndGame && (counter !== savedCounter.current)) {
      const timeout = counter ? 700 : 5500;
      savedCounter.current = counter;
      setTimeout(() => {
        autoplay();
        setCounter((prev) => prev + 1);
      }, timeout);
    } else if (isEndGame) {
      setIsAutoplay(false);
      setCounter(0);
      savedCounter.current = -1;
      buffCards.current.pop();
    }
  }, [isAutoplay, isEndGame, counter]);

  return (
    <Button variant="outlined" color="primary" onClick={handleClick}>autoplay</Button>
  );
};

export default Autoplay;
