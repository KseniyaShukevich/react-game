import idLocalStorage from './idLocalStorage';

const save = (level: string): void => {
  localStorage.setItem(`${idLocalStorage}level`, `${level}`);
};

const get = (): number => {
  const defaultOption: number = 0;
  const level: string = localStorage.getItem(`${idLocalStorage}level`);
  if (level) {
    const option: number = +level;
    return option;
  }
  return defaultOption;
};

const getSizeGrig = (): any => {
  const level: string = localStorage.getItem(`${idLocalStorage}level`);
  const option: number = +level;
  if (level && option) {
    return 1;
  }
  return 2;
};

interface ILevelObj {
  save: (level: string) => void
  get: () => number
  getSizeGrig: () => void
}

const levelObj: ILevelObj = {
  save,
  get,
  getSizeGrig,
};

export default levelObj;
