import * as React from 'react';
import { Box, Button, Link, Flex, Text } from 'rebass';
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { isNull, isNullOrUndefined } from 'util';
import { ReactMouseClickEvent } from '../types';

dayjs.extend(relativeTime)

type BadgeProps = {
  text: string;
  bg?: string;
  color?: string;
  onClick?: ReactMouseClickEvent;
};

export const Badge =
React.memo(({ text, onClick }: BadgeProps) => (
  <Box
    className='badge'
    onClick={onClick}
    sx={{
      display: 'inline-block',
      color: 'text',
      bg: 'background',
      px: 2,
      py: 1,
      mx: 1,
      borderRadius: 9999,
      cursor: 'pointer',
    }}>
    {text}
  </Box>
))

export const Duroktar = React.memo(() => (
  <Link
    href="https://github.com/duroktar"
    target="_blank"
    rel="noopener noreferrer"
    color='background'
    style={{textDecoration: 'none'}}
  >
    duroktar
  </Link>
))

type FancyButtonProps = {
  text: React.ReactNode;
  type?: string;
  onClick?: ReactMouseClickEvent;
};

export const FancyButton =
React.memo((props: FancyButtonProps) => (
  <span className="btn-wrapper">
    <Button
      id="button"
      sx={{ mt: '8px' }}
      onClick={props.onClick}
      type={props.type}
    >
      {props.text}
    </Button>
  </span>
))

type IfProps<T> = {
  condition: T;
  render: (c: T) => React.ReactElement;
};
export const If = function<T>({
  condition, render
}: IfProps<T>) {
  return !!condition ? render(condition) : null;
}

type ForEachProps<T> = {
  items:      T[];
  component?: new () => React.Component;
  key?:       string;
  render?:    (value: T) => React.ReactNode;
}
export const ForEach = function <T>({
  component: Component, ...props
}: ForEachProps<T>) {
  if (!isNullOrUndefined(Component)) {
    return (
      <React.Fragment>
        {props.items.map((item) => (
          <Component key={item[props.key!]} />
        ))}
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      {props.items.map(props.render!)}
    </React.Fragment>)
}

type LegendProps = { onClick: any, theme: string }
export const Legend = React.memo(({ onClick, theme }: LegendProps) => {
  const { t } = useTranslation();
  return (
    <Flex style={{position: 'absolute', width: '100%', top: 0, left: 0, right: 0, bottom: 0}} justifyContent='center' alignItems='center'>
      <Box id='legend' className={theme} sx={{borderRadius: 8, zIndex: 12}} bg="gray" px={3} py={4} width={550}>
        <Box width='100%' height={0} color='text'><i className="fa fa-window-close" style={{float: 'right'}} onMouseUp={onClick}></i></Box>
        <Text mb="6px" fontSize={[ 3, 4, 5 ]} color='primary'>{t('legend')}</Text>
        <Flex justifyContent="space-evenly" sx={{marginBottom: '4px'}}>
          <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>{'>'}</Text> {t('incrementTape')}</Text>
          <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>{'<'}</Text> {t('decrementTape')}</Text>
        </Flex>
        <Flex justifyContent="space-evenly" sx={{marginBottom: '4px'}}>
          <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>+</Text> {t('incrementByte')}</Text>
          <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>-</Text> {t('decrementByte')}</Text>
        </Flex>
        <Flex justifyContent="space-evenly" sx={{marginBottom: '4px'}}>
          <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>,</Text> {t('output')}</Text>
          <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>.</Text> {t('input')}</Text>
        </Flex>
        <Flex justifyContent="space-evenly" sx={{marginBottom: '4px'}}>
          <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>[</Text> {t('openLoop')}</Text>
          <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>]</Text> {t('closeLoop')}</Text>
        </Flex>
        <Flex px={2} pt={4} pb={2}>
          <Text mb="6px" fontSize={[ 3, 4 ]} color='secondary'>{t('Special Commands')}</Text>
        </Flex>
        <Flex px={2}>
          <Text color='text'><Text fontSize={[ 4 ]} color='primary'>$ </Text>{t('Shortcut')}</Text>
        </Flex>
        <Flex px={2} py={4}>
          <Text color='text'><Text fontSize={[ 4 ]} color='primary'># </Text>{t('Options')}</Text>
        </Flex>
        <Box px={[ 12 ]}>
          <Text color='text'>
            <Text fontSize={[ 2 ]} color='primary' mb={[ 2 ]}>#printMode={'<option>'}</Text>
            &nbsp; {t('ShortcutText')} <Tooltip text={t('ShortcutTip')} />
            <Text color='secondary' mt={[ 1.5 ]}>&nbsp; {t('default')} = literal</Text>
          </Text>
          <br />
          <Text color='text'>
            <Text fontSize={[ 2 ]} color='primary' mb={[ 2 ]}>#maxDepth={'<number>'}</Text>
            &nbsp; {t('OptionsText')} <Tooltip text={t('OptionsTip')} />
            <Text color='secondary' mt={[ 1.5 ]}>&nbsp; {t('default')} = 30000</Text>
          </Text>
        </Box>
      </Box>
    </Flex>
  )
})

export const Spinner = React.memo(() => (
  <div className="lds-grid">
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
  </div>
))

export const TimeStamp =
React.memo(({ date }: { date: Date | null }) => {
  const [time, setTime] = React.useState('never')
  const callback = React.useCallback(() => {
    if (isNull(date)) return;
    setTime(dayjs(date).fromNow())
    return callback
  }, [date])
  React.useEffect(() => {
    let timer = setInterval(callback(), 5000)
    return () => clearInterval(timer)
  }, [date])
  return (
    <React.Fragment>
      {time}
    </React.Fragment>
  )
})

export const Tooltip =
React.memo(({ text }: { text: string }) => {
  return (
    <span className='tooltip' style={{marginLeft: '4px'}}>
      <i className="fa fa-question-circle icon-tooltip" aria-hidden="true"></i>
      <span className="tooltip-box">{text}</span>
    </span>
  )
})
