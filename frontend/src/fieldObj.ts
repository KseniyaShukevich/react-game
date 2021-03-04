import idLocalStorage from './idLocalStorage';

const save = (field: string): void => {
  localStorage.setItem(`${idLocalStorage}field`, `${field}`);
};

const get = (): number => {
  const defaultOption: number = 0;
  const field: string = localStorage.getItem(`${idLocalStorage}field`);
  if (field) {
    const option: number = +field;
    return option;
  }
  return defaultOption;
};

interface IFieldObj {
  save: (field: string) => void
  get: () => number
  // getSizeGrig: () => void
}

const fieldObj: IFieldObj = {
  save,
  get,
  // getSizeGrig,
};

export default fieldObj;
