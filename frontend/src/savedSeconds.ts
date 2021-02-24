import idLocalStorage from './idLocalStorage';

const getSavedSeconds = (): number => {
  const seconds: number = +localStorage.getItem(`${idLocalStorage}seconds`);
  if (seconds) {
    return seconds;
  }
  return 0;
};

export default getSavedSeconds;
