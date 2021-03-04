import idLocalStorage from './idLocalStorage';

const darkTheme = {
  palette: {
    type: 'dark',
    primary: {
      main: 'rgba(0, 0, 0, 0.5)', dark: 'rgba(0, 0, 0, 0.9)',
    },
  },
};

const save = (theme: string): void => {
  localStorage.setItem(`${idLocalStorage}theme`, `${theme}`);
};

const get = (): number => {
  const defaultOption = 0;
  const theme: number = +localStorage.getItem(`${idLocalStorage}theme`);
  if (theme) {
    return theme;
  }
  return defaultOption;
};

const getTheme = (): any => {
  const defaultOption = {};
  const theme: number = +localStorage.getItem(`${idLocalStorage}theme`);
  if (theme) {
    return darkTheme;
  }
  return defaultOption;
};

interface IThemeObj {
  darkTheme: any
  save: (level: string) => void
  get: () => number
  getTheme: () => any
}

const themeObj: IThemeObj = {
  darkTheme,
  save,
  get,
  getTheme,
};

export default themeObj;
