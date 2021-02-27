import idLocalStorage from './idLocalStorage';

const save = (name: string, value: number): void => {
  localStorage.setItem(`${idLocalStorage}${name}`, `${value}`);
};
const get = (name: string): number => {
  const volume: string = localStorage.getItem(`${idLocalStorage}${name}`);
  if (volume) {
    return +volume;
  }
  return 1;
};

interface IAudioObj {
  save: (name: string, value: number) => void
  get: (name: string) => number
}

const audioObj: IAudioObj = {
  save,
  get,
};

export default audioObj;
