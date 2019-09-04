import "@babel/polyfill";
import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import merge from 'lodash.merge'
import rebass from '@rebass/preset'
import { BrainFuckContainer } from "./app/container";
import { BrainFuckView } from "./app/component";
import { themes, presets, ThemeName } from "./themes";

import './style/style.css';
import './i18n';

const Main = () => {
  const [ theme, setTheme ] = React.useState<ThemeName>(themes[0]);

  const appTheme = React.useMemo(() =>
    merge({}, rebass, presets[theme]), [theme])

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

import './style/ace-tomorrow-night.css';
import './style/clipboard.css';
import './style/file-drop.css';
import './style/flip.css';
import './style/spinner.css';
import './style/tooltip.css';
