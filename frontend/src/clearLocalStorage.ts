import idLocalStorage from './idLocalStorage';

const clearLocalStorage = (): void => {
  localStorage.removeItem(`${idLocalStorage}cards`);
  localStorage.removeItem(`${idLocalStorage}seconds`);
  localStorage.removeItem(`${idLocalStorage}errors`);
  localStorage.removeItem(`${idLocalStorage}isEndGame`);
};

export default clearLocalStorage;
