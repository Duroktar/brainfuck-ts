import * as React from 'react';
import { bf } from '../lib/bf';
import { initialState } from '../lib/initialState';
import { parseProgram } from '../lib/parseProgram';
import { Context, BfOptions } from '../types';
import { BrainFuckView } from "./website";
import { snippets, Snippets } from './website.snippets';

type ContainerProps = {
  component: typeof BrainFuckView;
};

type State = {
  input: string;
  ctx: Context;
  error?: Error;
  returnCode: number;
  result: string;
  time: string;
  examples: Snippets;
};

export class BrainFuckContainer extends React.Component<ContainerProps, State> {
  public state: State = {
    input: '',
    ctx: {
      state: initialState(30),
      options: {},
    },
    returnCode: -1,
    result: '',
    time: 'never',
    examples: snippets,
  };
  public render() {
    const { component: Component } = this.props;
    return (
      <Component
        dropStyle={this.dropStyle}
        handleChange={this.handleChange}
        handleCopy={this.handleCopy}
        handleDrop={this.handleDrop}
        handleSubmit={this.handleSubmit}
        input={this.state.input}
        result={this.state.result}
        time={this.state.time}
        examples={this.state.examples}
      />);
  }
  private handleCopy = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
  private handleChange = (input: string) => {
    this.setState({ input });
  };
  private handleDrop = (files: FileList | null) => {
    const file: any = (files || [])[0];
    if (file) {
      const setOutputText = (txt: string) => {
        this.setState({ input: txt }, () => {
          const el = document.getElementById('source')!;
          this.handleChange({ target: el, currentTarget: el } as any);
        });
      };
      file.text()
        .then((txt: string) => setOutputText(txt))
        .catch((err: Error) => alert(`There was an error processing the uploaded file.\nError: ${err}`));
    }
  };
  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ result: '' });
    this.state.ctx.state = initialState(30);
    this.repl(this.state.input, this.state.ctx)
      .then(code => this.setState({ returnCode: code, time: new Date().toUTCString() }))
      .catch(err => this.setState({ error: err, time: new Date().toUTCString() }));
  };
  private repl = (cmd: string, context: Context) => {
    const [options, source] = parseProgram(cmd);
    context.options = { ...context.options, ...options };
    context.state.chars = source;
    return bf(context.state, context.options, this.print);
  };
  private print = (val: number, options: BfOptions = {}) => {
    if (options.printMode === 'fromCharCode') {
      this.setState(prev => ({ ...prev, result: prev.result + (String.fromCharCode(val)) }));
    }
    else if (options.printMode === 'literal') {
      this.setState(prev => ({ ...prev, result: prev.result + (`${val}`) }));
    }
    else {
      this.setState(prev => ({ ...prev, result: prev.result + (`${val}`) }));
    }
  };
  // TODO move all styles to css
  get dropStyle() {
    return { width: 600, color: 'black', padding: 10 };
  }
}
