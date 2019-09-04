import * as React from 'react';
import { Box, Button, Link, Flex, Text } from 'rebass';
import { useTranslation } from "react-i18next";
import { withTheme } from 'emotion-theming';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ReactMouseClickEvent, HtmlElementProps } from '../types';
import { Theme, ThemeName } from '../themes';
import { isNull, isNullOrUndefined } from 'util';

///////////////////////////////////////////////////////////////////////////////

dayjs.extend(relativeTime)

///////////////////////////////////////////////////////////////////////////////

type BadgeProps = {
  text:     string;
  bg?:      string;
  color?:   string;
  theme:    string;
  onClick?: ReactMouseClickEvent;
};
export const Badge =
React.memo(({ text, onClick, theme }: BadgeProps) => (
  <Box
    className={`badge ${theme}`}
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

///////////////////////////////////////////////////////////////////////////////

const CloseButton = React.memo((props: HtmlElementProps) => (
  <i className="fa fa-window-close" {...props}></i>
))

///////////////////////////////////////////////////////////////////////////////

export const Duroktar = React.memo(() => (
  <Link
    href="https://github.com/duroktar"
    target="_blank"
    rel="noopener noreferrer"
    color='secondary'
    style={{textDecoration: 'none'}}
  >
    duroktar
  </Link>
))

///////////////////////////////////////////////////////////////////////////////

type FancyButtonProps = {
  text:     React.ReactNode;
  type?:    string;
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

///////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////

type IfProps<T> = {
  condition:  T;
  render:     (c: T) => React.ReactElement;
};
export const If = function<T>({
  condition, render
}: IfProps<T>) {
  return !!condition ? render(condition) : null;
}

///////////////////////////////////////////////////////////////////////////////

type LegendProps = {
  onClick:  (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  theme:    ThemeName;
}
export const Legend = React.memo(({ onClick, theme }: LegendProps) => {
  const { t } = useTranslation();
  const cNames = `shadow ${theme}`;
  return (
    <Flex className='cc-overlay'>
      <Box id='legend' className={theme} bg="gray" px={3} py={4} width={550}>
        <Box width='100%' height={0} color='text'>
          <CloseButton style={{float: 'right'}} onMouseUp={onClick} />
        </Box>
        <Text className={cNames} mb="6px" fontSize={[3, 4, 5]} color='primary'>
          {t('legend')}
        </Text>
        <Flex justifyContent="space-evenly" mb='4px'>
          <LegendCell className={cNames} symbol='>' children={t('incrementTape')} />
          <LegendCell className={cNames} symbol='<' children={t('decrementTape')} />
        </Flex>
        <Flex justifyContent="space-evenly" mb='4px'>
          <LegendCell className={cNames} symbol='+' children={t('incrementByte')} />
          <LegendCell className={cNames} symbol='-' children={t('decrementByte')} />
        </Flex>
        <Flex justifyContent="space-evenly" mb='4px'>
          <LegendCell className={cNames} symbol=',' children={t('output')} />
          <LegendCell className={cNames} symbol='.' children={t('input')} />
        </Flex>
        <Flex justifyContent="space-evenly" mb='4px'>
          <LegendCell className={cNames} symbol='[' children={t('openLoop')} />
          <LegendCell className={cNames} symbol=']' children={t('closeLoop')} />
        </Flex>
        <Flex px={2} pt={4} pb={2}>
          <Text className={cNames} fontSize={[3, 4]} mb="6px" color='secondary'>
            {t('Special Commands')}
          </Text>
        </Flex>
        <Flex px={2}>
          <Text color='text'>
            <Text className={cNames} fontSize={4} color='primary'>{'$ '}</Text>
            {t('Shortcut')}
          </Text>
        </Flex>
        <Flex px={2} pt={4} pb={3}>
          <Text color='text'>
            <Text className={cNames} fontSize={4} color='primary'>{'# '}</Text>
            {t('Options')}
          </Text>
        </Flex>
        <Box px={12}>
          <OptionCell
            desc={'#printMode=<option>'}
            text={t('ShortcutText')}
            tip={t('ShortcutTip')}
            def={`${t('default')} = literal`}
          />
          <br />
          <OptionCell
            desc={'#maxDepth=<number>'}
            text={t('OptionsText')}
            tip={t('OptionsTip')}
            def={`${t('default')} = 30000`}
          />
        </Box>
      </Box>
    </Flex>
  )
})

///////////////////////////////////////////////////////////////////////////////

type LegendCellProps = {
  children:   React.ReactNode;
  symbol:     string;
  className:  string;
};
const LegendCell =
React.memo(({ className, symbol, children }: LegendCellProps) => {
  return (
    <Text width="45%" color='text'>
      <Text className={className} mb='2px' fontSize={[4]} color='secondary'>
        {symbol}
      </Text>
      {children}
    </Text>
  )
})

///////////////////////////////////////////////////////////////////////////////

type OptionCellProps = {
  def:    React.ReactNode;
  desc:   React.ReactNode;
  text:   React.ReactNode;
  tip:    string;
  theme:  Theme;
};
const OptionCell = React.memo(
withTheme(({ theme, desc, text, tip, def }: OptionCellProps) => {
  const cName = `shadow ${theme}`;
  return (
    <Text color='text'>
      <Text className={cName} fontSize={[2]} mb={[2]}>{desc}</Text>
      &nbsp; {text} <Tooltip text={tip} />
      <Text color='secondary' mt={[ 1.5 ]}>&nbsp; {def}</Text>
    </Text>
  )
}))

///////////////////////////////////////////////////////////////////////////////

export const Spinner = React.memo(() => (
  <div className="lds-grid">
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
  </div>
))

///////////////////////////////////////////////////////////////////////////////

export const TimeStamp =
React.memo(({ date }: { date: Date | null }) => {
  const [time, setTime] = React.useState('never');

  const callback = React.useCallback(() => {
    if (isNull(date)) return;
    setTime(dayjs(date).fromNow());
    return callback;
  }, [date]);

  React.useEffect(() => {
    let timer = setInterval(callback(), 5000);
    return () => clearInterval(timer);
  }, [date]);

  return (
    <React.Fragment>
      {time}
    </React.Fragment>
  )
})

///////////////////////////////////////////////////////////////////////////////

export const Tooltip =
React.memo(({ text }: { text: string }) => {
  const cNames = "fa fa-question-circle icon-tooltip";
  return (
    <span className='tooltip' style={{marginLeft: '4px'}}>
      <i className={cNames} aria-hidden="true"></i>
      <span className="tooltip-box">{text}</span>
    </span>
  )
})

///////////////////////////////////////////////////////////////////////////////
