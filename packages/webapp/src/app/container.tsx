import * as React from 'react';
import * as BF from 'brainfuck-ts';
import i18n from "i18next";
import { BrainFuckView } from "./component";
import { snippets, Snippets } from './snippets';

export class BrainFuckContainer extends React.PureComponent<ContainerProps, State> {
  private STORAGE_KEY = '__bf_storage__theme';
  public state: State = BrainFuckContainer.DEFAULT_STATE;

  componentDidMount() {
    this.loadTheme().then(this.setTheme);
    this.setState({ locale: i18n.language })
  }
  public render() {
    const { component: Component } = this.props;
    return (
      <Component
        handleChange={this.handleChange}
        handleCopy={this.handleCopy}
        handleDrop={this.handleDrop}
        handleLegend={this.handleLegend}
        handleSubmit={this.handleSubmit}
        setTheme={this.setTheme}
        currentTheme={this.props.theme}
        input={this.state.input}
        result={this.state.result}
        locale={this.state.locale}
        time={this.state.time}
        error={this.state.error}
        examples={this.state.examples}
        showLegend={this.state.showLegend}
      />);
  }
  public handleCopy = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // find target element
    const t = e.currentTarget;
    try {
      const el = document.createElement("textarea");
      el.style.height = '0px';
      el.style.width = '1px';
      document.body.appendChild(el);
      el.value = this.state.input;
      el.select();
      // copy text
      document.execCommand('copy');
      document.body.removeChild(el);
      // copied animation
      t.classList.add('copied');
      setTimeout(function() {
        t.classList.remove('copied');
      }, 1500);
    } catch (err) {
      //fallback in case exexCommand doesnt work
      alert('please press Ctrl/Cmd+C to copy');
    }
  }
  public handleChange = (input: string) => {
    this.setState({ input });
  };
  public handleDrop = (files: FileList | null) => {
    const file: any = (files || [])[0];
    if (file) {
      const filedropCallback = (txt: string) => {
        this.setState({ input: txt });
        this.resetStateCtx();
      };
      file.text()
        .then((txt: string) => filedropCallback(txt))
        .catch((err: Error) => alert(
          `There was an error processing the uploaded file.\nError: ${err}`));
    }
  };
  public handleLegend = () => {
    this.setState(state => ({ ...state, showLegend: !state.showLegend }))
  };
  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    this.setState({ result: '', error: undefined });
    this.repl(this.state.input, this.state.ctx)
      .then(code => this.setState({ returnCode: code, time: new Date() }))
      .catch(err => this.setState({ error: err, time: new Date() }));
  };
  public repl = (cmd: string, context: BF.Context) => {
    const [options, source] = BF.parseProgram(cmd);
    return new Promise<number>((resolve) => {
      this.setState({
        ctx: {
          options,
          state: { ...BF.initialState(30), chars: source },
        }
      }, () => {
        const { options, state } = this.state.ctx;
        resolve(BF.bf(state, options, this.print));
      })
    })
  };
  public print = (val: number, options: BF.BfOptions = {}) => {
    if (options.printMode === 'fromCharCode') {
      let asString = String.fromCharCode(val);
      this.setState(prev => ({ ...prev, result: prev.result + asString }));
    }
    else if (options.printMode === 'literal') {
      this.setState(prev => ({ ...prev, result: prev.result + (`${val}`) }));
    }
    else {
      this.setState(prev => ({ ...prev, result: prev.result + (`${val}`) }));
    }
  };
  private loadTheme = async () => {
    const theme = localStorage.getItem(this.STORAGE_KEY)
    return this.isValidTheme(theme) ? theme : null;
  }
  private persistTheme = async (theme: string) => {
    if (this.isValidTheme(theme)) {
      localStorage.setItem(this.STORAGE_KEY, theme)
      return true
    }
    return false
  }
  private isValidTheme(theme: string | null): theme is 'light' | 'dark' {
    return ['light', 'dark'].includes(theme || '')
  }
  public setTheme = (theme: string | null) => {
    if (this.isValidTheme(theme)) {
      this.props.setTheme(theme);
      return this.persistTheme(theme);
    }
  }
  private resetStateCtx = () => {
    this.setState({ ctx: {
      state: BF.initialState(30),
      options: {},
    }})
  }
  static DEFAULT_STATE: State = {
    input: '',
    ctx: {
      state: BF.initialState(30),
      options: {},
    },
    returnCode: -1,
    result: '',
    time: null,
    examples: snippets,
    showLegend: false,
    locale: '',
  };
}

type ContainerProps = {
  component: typeof BrainFuckView;
  setTheme: (theme: 'light' | 'dark') => void;
  theme: 'light' | 'dark';
};

type State = {
  input: string;
  ctx: BF.Context;
  error?: Error;
  returnCode: number;
  result: string;
  locale: string;
  time: Date | null;
  examples: Snippets;
  showLegend: boolean;
};
