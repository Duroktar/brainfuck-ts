import * as React from 'react';
import { Box, Button, Link } from 'rebass';
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

export const Duroktar = React.memo(() => (
  <Link
    href="https://github.com/duroktar"
    target="_blank"
    rel="noopener noreferrer"
  >
    duroktar
  </Link>
))

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
