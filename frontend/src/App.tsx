import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import GridGame from './GridGame';
import Footer from './Footer';
import themeObj from './themeObj';

const App: React.FC = () => {
  const [theme, setTheme] = useState(themeObj.getTheme());

  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      <GridGame theme={theme} setTheme={setTheme} />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
