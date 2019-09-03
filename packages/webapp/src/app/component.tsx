import * as React from 'react';
import FileDrop from 'react-file-drop';
import AceEditor from 'react-ace';
import Switch from "react-switch";
import { useTranslation } from "react-i18next";
import { withTheme } from 'emotion-theming'
import { Flex, Box, Text } from "rebass";
import { Textarea } from '@rebass/forms';
import { Badge, TimeStamp, FancyButton, If } from "./atoms";
import { ForEach, Spinner, Duroktar, Legend } from "./atoms";
import { Snippets } from './snippets';
import { Theme } from '../themes';

import './editor.mode';

type Props = {
  handleChange: (value: string, event?: any) => void;
  handleCopy: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleDrop: (files: FileList | null, event: React.DragEvent<HTMLDivElement>) => any;
  handleLegend: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  dropStyle: React.CSSProperties;
  setTheme: (theme: string) => void;
  currentTheme: 'light' | 'dark';
  theme: Theme;
  input: string;
  locale: string;
  result: any;
  showLegend: boolean;
  time: Date | null;
  examples: Snippets;
  error?: Error;
}

export const BrainFuckView =
React.memo(withTheme((props: Props) => {
  const { t } = useTranslation();
  return (
    <React.Suspense fallback={<div className='ace_editor-fallback'><Spinner /></div>}>
      <Box id='page' backgroundColor='muted'>
        <Box id='page-overlay'>
          <If condition={props.showLegend} render={() => (
            <Legend theme={props.currentTheme} onClick={props.handleLegend} />
          )} />
          <Box className='content'>
            <Flex justifyContent='center' px={12} py={12}>
              <Text
                id='title'
                fontSize={[8]}
                fontWeight='bold'
                color='primary'
                sx={{textShadow: props.currentTheme === 'dark'
                  ? '4px 7px 3px #000000'
                  : `3px 2px 3px ${props.theme.colors.shadow}`}}
              >
                {t('brainfuck')}
              </Text>
              <Switch
                className='theme-toggle'
                onChange={isSet => props.setTheme(isSet ? 'light' : 'dark')}
                checked={props.currentTheme === 'light'}
                onColor='#cecece'
                offColor='#444343'
                checkedIcon={<>&nbsp;&nbsp;☀️</>}
                uncheckedIcon={<>&nbsp;🌛</>}
              />
            </Flex>
            <Flex justifyContent='center' px={12} py={12}>
              <Text fontSize={[14]} fontWeight='bold' color='secondary'>
                {t('examplesTitle')}
              </Text>
            </Flex>
            <Flex justifyContent='center' px={12} py={12}>
              <ForEach items={Object.entries(props.examples)} render={([key, val]) => (
                <Badge key={key} text={key} theme={props.currentTheme} onClick={() => props.handleChange(val)} />
              )} />
            </Flex>
            <Flex alignItems='center' px={12} py={12}>
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
                      showGutter
                    />
                    <Text color="primary" sx={{cursor: 'pointer', float: 'right'}}>
                      <a onClick={props.handleLegend}>{t('reference')}</a>
                    </Text>
                    <FancyButton text={t('evaluate')} type='submit' />
                    <Flex id='timestamp' color='primary'>
                      <Text color='primary'>{t('lastUpdated')}&nbsp;</Text>
                      <Text color='secondary'><TimeStamp date={props.time} /></Text>
                    </Flex>
                  </form>
                </React.Suspense>
              </Box>
            </Flex>
            <Flex alignItems='center' px={12} py={12}>
              <Box style={props.dropStyle} sx={{ mx: 'auto', px: 30, width: '100%' }}>
                <FileDrop onDrop={props.handleDrop}>
                  <Text color='secondary' style={{textShadow: '1px 1px 4px black'}}>
                    {t('fileDrop')}
                  </Text>
                </FileDrop>
              </Box>
            </Flex>
            <Flex alignItems='center' px={12} pb={12} pt={10}>
              <Box style={props.dropStyle} sx={{ mx: 'auto', px: 30, width: '100%' }}>
                <Textarea
                  id='result'
                  name='result'
                  value={props.result}
                  rows={8}
                  backgroundColor='gray'
                  color='text'
                  placeholder={t('result')}
                  style={props.currentTheme === 'dark' ? { border: '0px' } : undefined}
                  sx={{ maxWidth: '100%', minWidth: '100%', minHeight: '8em' }}
                  readOnly
                />
              </Box>
            </Flex>
          </Box>
          <If condition={props.error} render={error => (
            <Flex alignItems='center' height={0} px={12} py={0}>
              <Box id='flip' style={props.dropStyle} height={0} sx={{ mx: 'auto', px: 30, py: 0, width: '100%' }}>
                <div><div>
                  <Text sx={{position: 'absolute', fontWeight: 'bold'}} color='red'>{error!.message}</Text>
                </div></div>
              </Box>
            </Flex>
          )} />
          <footer>
            <Flex justifyContent='center' px={12} py={12}>
              <div id='footer-items'>
                <Flex>
                  <Text color="primary" width='auto'>{t('locale')}&nbsp;</Text>
                  <Text color="secondary" width='auto'>{props.locale}</Text>
                  <span className='tooltip' style={{marginLeft: '4px'}}>
                    <i className="fa fa-question-circle icon-tooltip" aria-hidden="true"></i>
                    <span className="tooltip-box">{t('LanguageTip')}</span>
                  </span>
                </Flex>
                <Box>
                  <Text color='primary'>
                    {t('createdBy')}<Duroktar />
                  </Text>
                </Box>
              </div>
            </Flex>
          </footer>
        </Box>
      </Box>
    </React.Suspense>
  )
}))
