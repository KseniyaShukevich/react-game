import ICard from './ICard';
import idLocalStorage from './idLocalStorage';
import getRandomNumber from './getRandomNumber';
import levelObj from './levelObj';

const levels: Array<number> = [6, 8, 12];
let pairsCards: number;

const getCardsNumbers = (): Array<number> => {
  const level = levelObj.get();
  pairsCards = levels[level];
  const maxCountCards: number = 52;
  const buff: Array<number> = [];

  for (let i = 0; i < pairsCards; i += 1) {
    const indexCard: number = getRandomNumber(maxCountCards);
    if (!buff.includes(indexCard)) {
      buff.push(indexCard);
    } else {
      i -= 1;
    }
  }

  return buff;
};

const getMixCards = (cards: Array<number>): Array<number> => {
  const countCards: number = pairsCards * 2;
  const buff: Array<number> = [];
  const mixCards: Array<number> = [];

  for (let i = 0; i < countCards; i += 1) {
    const indexCard: number = getRandomNumber(countCards);
    if (!buff.includes(indexCard)) {
      buff.push(indexCard);
      mixCards.push(cards[indexCard]);
    } else {
      i -= 1;
    }
  }

  return mixCards;
};

const getCardsObjects = (cards: Array<number>): Array<ICard> => {
  const cardsObjects: Array<ICard> = cards.map((card: number, index: number) => {
    const cardObject: ICard = {
      id: index,
      value: card,
      isCorrect: false,
      isOpen: false,
    };
    return cardObject;
  });

  return cardsObjects;
};

const getNewCards = (): Array<ICard> => {
  const savedGame: string = localStorage.getItem(`${idLocalStorage}cards`);
  if (savedGame) {
    return JSON.parse(savedGame);
  }
  const cardsNumbers: Array<number> = getCardsNumbers();
  const cards: Array<number> = [...cardsNumbers, ...cardsNumbers];
  const mixCards: Array<number> = getMixCards(cards);
  const cardsObjects: Array<ICard> = getCardsObjects(mixCards);
  return cardsObjects;
};

export default getNewCards;
