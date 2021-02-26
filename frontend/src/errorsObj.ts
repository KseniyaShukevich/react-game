import idLocalStorage from './idLocalStorage';

const save = (count: number): void => {
  localStorage.setItem(`${idLocalStorage}errors`, `${count}`);
};

const getSaved = (): number => {
  const errors: number = +localStorage.getItem(`${idLocalStorage}errors`);
  if (errors) {
    return errors;
  }
  return 0;
};

interface IErrors {
  save: (count: number) => void
  getSaved: () => number
}

const errorsObj: IErrors = {
  save,
  getSaved,
};

export default errorsObj;
