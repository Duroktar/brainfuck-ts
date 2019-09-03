import * as React from 'react';
import FileDrop from 'react-file-drop';
import AceEditor from 'react-ace';
import Switch from "react-switch";
import { language } from "i18next";
import { useTranslation } from "react-i18next";
import { Flex, Box, Text } from "rebass";
import { Textarea } from '@rebass/forms';
import { Badge, TimeStamp, FancyButton, If } from "./atoms";
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
  locale: string;
  result: any;
  showLegend: boolean;
  time: Date | null;
  examples: Snippets;
  error?: Error;
}

export const BrainFuckView = React.memo((props: Props) => {
  const { t } = useTranslation();
  return (
    <React.Suspense fallback={<div className='ace_editor-fallback'><Spinner /></div>}>
      {props.showLegend && <Legend theme={props.theme} onClick={props.handleLegend} />}
      <Box className='content' bg='muted'>
        <Flex justifyContent='center' px={12} py={12}>
          <Text id='title' fontSize={[42]} fontWeight='bold' color='primary'>
            {t('brainfuck')}
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
        <Flex justifyContent='center' px={12} py={12}>
          <Text fontSize={[14]} fontWeight='bold' color='secondary'>
            {t('examplesTitle')}
          </Text>
        </Flex>
        <Flex justifyContent='center' px={12} py={12}>
          <ForEach items={Object.entries(props.examples)} render={([key, val]) => (
            <Badge key={key} text={key} onClick={() => props.handleChange(val)} />
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
                />
                <Text color="primary" sx={{cursor: 'pointer', float: 'right'}}>
                  <a onClick={props.handleLegend}>{t('reference')}</a>
                </Text>
                <FancyButton text={t('evaluate')} type='submit' />
                <Flex sx={{ mt: '18px', mr: '-45px', width: '50%', float: 'right' }} color='primary'>
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
              <Text color='secondary'>
                {t('fileDrop')}
              </Text>
            </FileDrop>
          </Box>
        </Flex>
        <Flex alignItems='center' px={12} py={12}>
          <Box style={props.dropStyle} sx={{ mx: 'auto', px: 30, width: '100%' }}>
            <Textarea
              id='result'
              name='result'
              value={props.result}
              rows={8}
              backgroundColor='gray'
              color='text'
              placeholder={t('fileDrop')}
              readOnly
            />
          </Box>
        </Flex>
      </Box>
      <If condition={props.error} render={error => (
        <Flex alignItems='center' height={0} px={12} py={0}>
          <Box id='flip' style={props.dropStyle} height={0} sx={{ mx: 'auto', px: 30, py: 0, width: '100%' }}>
            <div><div>
              <Text sx={{position: 'absolute'}} color='red'>{error!.message}</Text>
            </div></div>
          </Box>
        </Flex>
      )} />
      <footer>
        <Flex justifyContent='center' px={12} py={12} bg='muted'>
          <div style={{maxWidth: '590px', width: '100%'}}>
            <Flex sx={{position: 'absolute'}}>
              <Text color="primary" width='auto'>{t('locale')}&nbsp;</Text>
              <Text color="secondary" width='auto'>{props.locale}</Text>
              <span className='tooltip' style={{marginLeft: '4px'}}>
                <i className="fa fa-question-circle icon-tooltip" aria-hidden="true"></i>
                <span className="tooltip-box">{t('LanguageTip')}</span>
              </span>
            </Flex>
            <Box sx={{float: 'right'}}>
              <Text color='primary'>
                {t('createdBy')}<Duroktar />
              </Text>
            </Box>
          </div>
        </Flex>
      </footer>
    </React.Suspense>
  )
})
