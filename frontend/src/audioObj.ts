import idLocalStorage from './idLocalStorage';

const save = (name: string, value: number): void => {
  localStorage.setItem(`${idLocalStorage}${name}`, `${value}`);
};

const isNoVolume = (name: string): boolean => {
  const volume: string = localStorage.getItem(`${idLocalStorage}${name}No`);
  if (volume) {
    return true;
  }
  return false;
};

const get = (name: string): number => {
  const volume: string = localStorage.getItem(`${idLocalStorage}${name}`);
  if (volume) {
    return +volume;
  }
  return 1;
};

const remove = (name: string) => {
  localStorage.removeItem(`${idLocalStorage}${name}`);
};

interface IAudioObj {
  save: (name: string, value: number) => void
  get: (name: string) => number
  remove: (name: string) => void
  isNoVolume: (name: string) => boolean
}

const audioObj: IAudioObj = {
  save,
  get,
  remove,
  isNoVolume,
};

export default audioObj;
