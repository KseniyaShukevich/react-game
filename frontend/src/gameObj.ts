import idLocalStorage from './idLocalStorage';
import ICard from './ICard';

const save = (cards: Array<ICard>): void => {
  const jsonCards: string = JSON.stringify(cards);
  localStorage.setItem(`${idLocalStorage}cards`, jsonCards);
};

const isSave = (): boolean => {
  const savedGame: string = localStorage.getItem(`${idLocalStorage}cards`);
  if (savedGame) {
    return true;
  }
  return false;
};

const getIsEndGame = (): boolean => {
  const endGame: string = localStorage.getItem(`${idLocalStorage}isEndGame`);
  if (endGame) {
    return true;
  }
  return false;
};

const saveIsEndGame = (): void => {
  localStorage.setItem(`${idLocalStorage}isEndGame`, '1');
};

interface IGame {
  save: (cards: Array<ICard>) => void
  isSave: () => boolean
  getIsEndGame: () => boolean
  saveIsEndGame: () => void
}

const gameObj: IGame = {
  save,
  isSave,
  getIsEndGame,
  saveIsEndGame,
};

export default gameObj;
