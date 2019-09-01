import "@babel/polyfill";
import * as React from 'react';
import ReactDOM from 'react-dom';
import FileDrop from 'react-file-drop';
import AceEditor from 'react-ace';
import { ThemeProvider } from 'emotion-theming';
import { Flex, Box, Button, Text } from "rebass";
import { Label, Textarea } from '@rebass/forms';
import theme from '@rebass/preset';
import { BrainFuckContainer } from "./website.state";

import './brainfuck.mode.js';
import 'brace/theme/tomorrow_night';
import "brace/ext/language_tools";
import 'brace/ext/spellcheck';

type Props = {
  handleChange: BrainFuckContainer["handleChange"]
  handleCopy: BrainFuckContainer["handleCopy"]
  handleDrop: BrainFuckContainer["handleDrop"]
  handleSubmit: BrainFuckContainer["handleSubmit"]
  input: BrainFuckContainer["state"]["input"]
  result: BrainFuckContainer["state"]["result"]
  time: BrainFuckContainer["state"]["time"]
  examples: BrainFuckContainer["state"]["examples"]
  dropStyle: BrainFuckContainer["dropStyle"]
}

export const BrainFuckView = React.memo((props: Props) => (
  <React.Fragment>
    <Box className='content'>
      <Flex justifyContent='center' px={12} py={12} bg='muted'>
        <Text
          fontSize={[ 42 ]}
          fontWeight='bold'
          color='primary'>
          Brainfuck
        </Text>
      </Flex>
      <Flex justifyContent='center' px={12} py={12} bg='muted'>
        <Text
          fontSize={[ 14 ]}
          fontWeight='bold'
          color='secondary'>
          Click one of the buttons to load up its example source
        </Text>
      </Flex>
      <Flex justifyContent='center' px={12} py={12} bg='muted'>
        {Object.entries(props.examples).map(([key, val]) => (
          <Badge key={key} text={key} onClick={() => props.handleChange(val)} />
        ))}
      </Flex>
      <Flex alignItems='center' px={12} py={12} bg='muted'>
        <Box style={props.dropStyle} sx={{ mx: 'auto', py: 30, width: '100%' }}>
          <form onSubmit={props.handleSubmit}>
            <div id="copy" onClick={props.handleCopy} title="Copy to clipboard">
              <i className="fa fa-clipboard" aria-hidden="true" data-copytarget="#link" />
            </div>
            <AceEditor
              mode="brainfuck"
              theme="tomorrow_night"
              onChange={props.handleChange}
              name="source"
              value={props.input}
              editorProps={{ $blockScrolling: true }}
              style={{ height: '29.5em', width: '100%' }}
            />
            <Button sx={{ mt: '8px' }} type="submit">Evaluate</Button>
            <Text sx={{ mt: '14px', float: 'right', width: '50%' }}>
              Last Evaluated @ {props.time}
            </Text>
          </form>
        </Box>
      </Flex>
      <Flex alignItems='center' px={12} py={12} bg='muted'>
        <Box style={props.dropStyle} sx={{ mx: 'auto', px: 30, width: '100%' }}>
          <Label htmlFor='result'>Result</Label>
          <Textarea
            id='result'
            name='result'
            value={props.result}
            rows={8}
            readOnly
          />
        </Box>
      </Flex>
      <Flex alignItems='center' px={12} py={12} bg='muted'>
        <Box style={props.dropStyle} sx={{ mx: 'auto', px: 30, width: '100%' }}>
          <FileDrop onDrop={props.handleDrop}>
            Drop your own brainfuck files here to load them
          </FileDrop>
        </Box>
      </Flex>
    </Box>
    <footer>
      <Flex px={12} py={12}>
        Created by duroktar.
      </Flex>
    </footer>
  </React.Fragment>
))

type BadgeProps = {
  text: string;
  bg?: string;
  color?: string;
  onClick?: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Badge = React.memo(({ color, bg, text, onClick }: BadgeProps) => (
  <Box
    onClick={onClick}
    sx={{
      display: 'inline-block',
      color: color || 'white',
      bg: bg || 'green',
      px: 2,
      py: 1,
      mx: 1,
      borderRadius: 9999,
      cursor: 'pointer',
    }}>
    {text}
  </Box>
))

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrainFuckContainer component={BrainFuckView} />
  </ThemeProvider>,
  document.getElementById('root')
);
