import idLocalStorage from './idLocalStorage';
import IStatistics from './IStatistics';

const save = (score: number, countSeconds: number, errors: number): void => {
  const savedStatistics: string = localStorage.getItem(`${idLocalStorage}statistics`);
  const newStatistics: IStatistics = {
    score,
    countSeconds,
    errors,
  };
  if (savedStatistics) {
    const arrayStatistics: Array<IStatistics> = JSON.parse(savedStatistics);
    arrayStatistics.push(newStatistics);
    arrayStatistics.sort((a, b) => b.score - a.score);
    localStorage.setItem(`${idLocalStorage}statistics`, JSON.stringify(arrayStatistics.slice(0, 10)));
  } else {
    localStorage.setItem(`${idLocalStorage}statistics`, JSON.stringify([newStatistics]));
  }
};

const setInRating = (array: Array<IStatistics>): void => {
  array.forEach((item, index) => {
    item.id = index + 1;
  });
};

const get = (): Array<IStatistics> | null => {
  const savedStatistics = localStorage.getItem(`${idLocalStorage}statistics`);
  if (savedStatistics) {
    const arrayStatistics: Array<IStatistics> = JSON.parse(savedStatistics);
    setInRating(arrayStatistics);
    return arrayStatistics;
  }
  return null;
};

interface IStatisticsObj {
  save: (score: number, seconds: number, errors: number) => void
  get: () => Array<IStatistics> | null
}

const statisticsObj: IStatisticsObj = {
  save,
  get,
};

export default statisticsObj;
