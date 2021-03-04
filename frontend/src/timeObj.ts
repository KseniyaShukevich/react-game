import idLocalStorage from './idLocalStorage';

const getMinutes = (count: number): number => {
  const res: number = Math.floor(count / 60);
  return res;
};

const getSeconds = (count: number): string => {
  const res = count % 60;
  if (res < 10) {
    return `0${res}`;
  }
  return `${res}`;
};

const save = (count: number): void => {
  localStorage.setItem(`${idLocalStorage}seconds`, `${count}`);
};

const getSavedSeconds = (): number => {
  const seconds: number = +localStorage.getItem(`${idLocalStorage}seconds`);
  if (seconds) {
    return seconds;
  }
  return 0;
};

interface ITimeObj {
  getMinutes: (count: number) => number
  getSeconds: (count: number) => string
  save: (count: number) => void
  getSavedSeconds: () => number
}

const timeObj: ITimeObj = {
  getMinutes,
  getSeconds,
  save,
  getSavedSeconds,
};

export default timeObj;
