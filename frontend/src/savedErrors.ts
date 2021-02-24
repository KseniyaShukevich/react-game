import idLocalStorage from './idLocalStorage';

const getSavedErrors = (): number => {
  const errors: number = +localStorage.getItem(`${idLocalStorage}errors`);
  if (errors) {
    return errors;
  }
  return 0;
};

export default getSavedErrors;
