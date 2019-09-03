import "@babel/polyfill";
import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import merge from 'lodash.merge'
import rebass from '@rebass/preset'
import { BrainFuckContainer } from "./app/container";
import { BrainFuckView } from "./app/component";
import { themes, presets, ThemeName } from "./themes";

const Main = () => {
  const [ theme, setTheme ] = React.useState<ThemeName>(themes[0]);

  const appTheme = React.useMemo(() => merge({}, rebass, presets[theme]), [theme])

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

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
