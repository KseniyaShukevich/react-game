import ICard from './ICard';

const getRandomNumber = (maxCount: number): number => {
  const rand: number = Math.random() * (maxCount);
  return Math.floor(rand);
};

const getCardsNumbers = (): Array<number> => {
  const maxCountCards: number = 52;
  const countCards: number = 6;
  const buff: Array<number> = [];

  for (let i = 0; i < countCards; i += 1) {
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
  const countCards: number = 6 * 2;
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
  const cardsObjects: Array<ICard> = cards.map((card: number) => {
    const cardObject: ICard = {
      value: card,
      isCorrect: false,
      isOpen: false,
    };
    return cardObject;
  });

  return cardsObjects;
};

const getNewCards = (): Array<ICard> => {
  const cardsNumbers: Array<number> = getCardsNumbers();
  const cards: Array<number> = [...cardsNumbers, ...cardsNumbers];
  const mixCards: Array<number> = getMixCards(cards);
  const cardsObjects: Array<ICard> = getCardsObjects(mixCards);
  return cardsObjects;
};

export default getNewCards;
