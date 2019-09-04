import "@babel/polyfill";
import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import { BrainFuckContainer } from "./app/container";
import { BrainFuckView } from "./app/component";
import { themes, presets, ThemeName } from "./themes";

import './styles';
import './i18n';

const Main = () => {
  const [ theme, setTheme ] = React.useState<ThemeName>(themes[0]);

  const appTheme = React.useMemo(() => presets[theme], [theme])

  return (
    <ThemeProvider theme={appTheme}>
      <BrainFuckContainer
        component={BrainFuckView}
        setTheme={setTheme}
        theme={theme}
      />
    </ThemeProvider>
  )
}

document.body.addEventListener('keyup', function(e) {
  if (e.which === 9) {
    document.documentElement.classList.remove('no-focus-outline');
  }
});

ReactDOM.render(<Main />, document.getElementById('root'));
