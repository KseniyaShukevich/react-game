import idLocalStorage from './idLocalStorage';
import ICard from './ICard';

const saveGame = (cards: Array<ICard>): void => {
  const jsonCards: string = JSON.stringify(cards);
  localStorage.setItem(`${idLocalStorage}cards`, jsonCards);
};

export default saveGame;
