import * as React from 'react';
import FileDrop from 'react-file-drop';
import AceEditor from 'react-ace';
import Switch from "react-switch";
import { Flex, Box, Text } from "rebass";
import { Textarea } from '@rebass/forms';
import { Badge, TimeStamp, FancyButton } from "./atoms";
import { ForEach, Spinner, Duroktar, Legend } from "./atoms";
import { Snippets } from './snippets';

import './editor.mode';

type Props = {
  handleChange: (value: string, event?: any) => void;
  handleCopy: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleDrop: (files: FileList | null, event: React.DragEvent<HTMLDivElement>) => any;
  handleLegend: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  dropStyle: React.CSSProperties;
  setTheme: (theme: string) => void;
  theme: 'light' | 'dark';
  input: string;
  result: any;
  showLegend: boolean;
  time: Date | null;
  examples: Snippets;
  error?: Error;
}

export const BrainFuckView = React.memo((props: Props) => (
  <React.Fragment>
    {props.showLegend && <Legend onClick={props.handleLegend} />}
    <Box className='content' bg='muted'>
      <Flex justifyContent='center' px={12} py={12} bg='muted'>
        <Text id='title' fontSize={[42]} fontWeight='bold' color='primary'>
          Brainfuck
        </Text>
        <Switch
          className='theme-toggle'
          onChange={isSet => props.setTheme(isSet ? 'light' : 'dark')}
          checked={props.theme === 'light'}
          onColor='#cecece'
          offColor='#444343'
          checkedIcon={<>&nbsp;☀️</>}
          uncheckedIcon={<>&nbsp;🌛</>}
        />
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
          <React.Suspense fallback={<div className='ace_editor-fallback'><Spinner /></div>}>
            <form onSubmit={props.handleSubmit}>
              <div id='copy' onClick={props.handleCopy} title='Copy to clipboard'>
                <i className='fa fa-clipboard' aria-hidden='true' data-copytarget='#link' />
              </div>
              <AceEditor
                mode='brainfuck'
                theme='tomorrow_night'
                onChange={props.handleChange}
                name='source'
                value={props.input}
                editorProps={{ $blockScrolling: true }}
                style={{ height: '29.5em', width: '100%' }}
              />
              <FancyButton text='Evaluate' type='submit' />
              <Text sx={{ mt: '14px', float: 'right', width: '50%' }} color='primary'>
                <Text color='primary'>
                  Last Evaluated @ <TimeStamp date={props.time} />
                </Text>
              </Text>
            </form>
          </React.Suspense>
        </Box>
      </Flex>
      <Flex alignItems='center' px={12} py={12} bg='muted'>
        <Box style={props.dropStyle} sx={{ mx: 'auto', px: 30, width: '100%' }}>
          <FileDrop onDrop={props.handleDrop}>
            <Text color='secondary'>
              Drop your own brainfuck files here to load them
            </Text>
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
            backgroundColor='gray'
            color='text'
            placeholder='Evaluate code and see the output here'
            readOnly
          />
        </Box>
      </Flex>
    </Box>
    {props.error && (
      <Flex alignItems='center' height={0} px={12} py={0} bg='muted'>
        <Box style={props.dropStyle} height={0} sx={{ mx: 'auto', px: 30, py: 0, width: '100%' }}>
          <Text sx={{position: 'absolute', mt: '-20px'}} color='red'>{props.error.message}</Text>
        </Box>
      </Flex>
    )}
    <footer>
      <Flex justifyContent='center' px={12} py={12} bg='muted'>
        <div style={{maxWidth: '675px', width: '100%'}}>
          <Box>
            <Text color="secondary" sx={{cursor: 'pointer'}}>
              <a onClick={props.handleLegend}>Language reference</a>
            </Text>
          </Box>
          <Box sx={{float: 'right'}}>
            <Text color='primary'>
              Created by <Duroktar />
            </Text>
          </Box>
        </div>
      </Flex>
    </footer>
  </React.Fragment>
))
