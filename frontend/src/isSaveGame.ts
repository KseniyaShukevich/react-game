import idLocalStorage from './idLocalStorage';

const isSaveGame = (): boolean => {
  const savedGame: string = localStorage.getItem(`${idLocalStorage}cards`);
  if (savedGame) {
    return true;
  }
  return false;
};

export default isSaveGame;
