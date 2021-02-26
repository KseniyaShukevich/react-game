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

interface IErrorsObj {
  save: (count: number) => void
  getSaved: () => number
}

const errorsObj: IErrorsObj = {
  save,
  getSaved,
};

export default errorsObj;
