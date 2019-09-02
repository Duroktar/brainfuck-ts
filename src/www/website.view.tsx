import "@babel/polyfill";
import * as React from 'react';
import ReactDOM from 'react-dom';
import FileDrop from 'react-file-drop';
import AceEditor from 'react-ace';
import { ThemeProvider } from 'emotion-theming';
import { Flex, Box, Text } from "rebass";
import { Label, Textarea } from '@rebass/forms';
import { Badge, TimeStamp, FancyButton, ForEach, Spinner, LinkToMe } from "./website.atoms";
import { BrainFuckContainer } from "./website.state";
import { theme } from './website.theme';

import './brainfuck.mode.js';

type Props = Pick<BrainFuckContainer,
  | "handleChange"
  | "handleCopy"
  | "handleDrop"
  | "handleSubmit"
  | "dropStyle"
>

type State = Pick<BrainFuckContainer["state"],
  | "input"
  | "result"
  | "time"
  | "examples"
>

export const BrainFuckView = React.memo((props: Props & State) => (
  <React.Fragment>
    <Box className='content' bg="muted">
      <Flex justifyContent='center' px={12} py={12} bg='muted'>
        <Text fontSize={[42]} fontWeight='bold' color='primary'>
          Brainfuck
        </Text>
      </Flex>
      <Flex justifyContent='center' px={12} py={12} bg='muted'>
        <Text fontSize={[14]} fontWeight='bold' color='secondary'>
          Click one of the buttons to load up the example source
        </Text>
      </Flex>
      <Flex justifyContent='center' px={12} py={12} bg='muted'>
        <ForEach items={Object.entries(props.examples)} render={([key, val]) => (
          <Badge key={key} text={key} onClick={() => props.handleChange(val)} />
        )} />
      </Flex>
      <Flex alignItems='center' px={12} py={12} bg='muted'>
        <Box style={props.dropStyle} sx={{ mx: 'auto', py: 30, width: '100%' }}>
          <React.Suspense fallback={<div className="ace_editor-fallback"><Spinner /></div>}>
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
              <FancyButton text="Evaluate" type="submit" />
              <Text sx={{ mt: '14px', float: 'right', width: '50%' }} color='primary'>
                <Text color='primary'>Last Evaluated @ <TimeStamp date={props.time} /></Text>
              </Text>
            </form>
          </React.Suspense>
        </Box>
      </Flex>
      <Flex alignItems='center' px={12} py={12} bg='muted'>
        <Box style={props.dropStyle} sx={{ mx: 'auto', px: 30, width: '100%' }}>
          <FileDrop onDrop={props.handleDrop}>
            <Text color='secondary'>Drop your own brainfuck files here to load them</Text>
          </FileDrop>
        </Box>
      </Flex>
      <Flex alignItems='center' px={12} py={12} bg='muted'>
        <Box style={props.dropStyle} sx={{ mx: 'auto', px: 30, width: '100%' }}>
          <Textarea
            id='result'
            name='result'
            value={props.result}
            rows={8}
            backgroundColor="white"
            placeholder="Evaluate code and see the output here"
            readOnly
          />
        </Box>
      </Flex>
    </Box>
    <footer>
      <Flex px={12} py={12} sx={{justifyContent: 'space-between'}} bg="muted">
        <div></div>
        <Box sx={{float: 'right'}}>
          <Text color='primary'>Created by <LinkToMe /></Text>
        </Box>
      </Flex>
    </footer>
  </React.Fragment>
))

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrainFuckContainer component={BrainFuckView} />
  </ThemeProvider>,
  document.getElementById('root')
);
