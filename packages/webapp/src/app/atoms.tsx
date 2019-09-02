import * as React from 'react';
import { Box, Button, Link, Flex, Text } from 'rebass';
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

export const Duroktar = React.memo(() => (
  <Link
    href="https://github.com/duroktar"
    target="_blank"
    rel="noopener noreferrer"
  >
    duroktar
  </Link>
))

type LegendProps = { onClick: any }
export const Legend = React.memo(({ onClick }: LegendProps) => (
  <Flex sx={{position: 'absolute', width: '100%' }} style={{top: 0, left: 0, right: 0, bottom: 0}} justifyContent='center' alignItems='center'>
    <Box sx={{borderRadius: 8, zIndex: 12}} bg="gray" px={3} py={4} width={550}>
      <Box width='100%' height={0} color='text'><i className="fa fa-window-close" style={{float: 'right'}} onMouseUp={onClick}></i></Box>
      <Text mb="6px" fontSize={[ 3, 4, 5 ]} color='primary'>Legend</Text>
      <Flex justifyContent="space-evenly" sx={{marginBottom: '4px'}}>
        <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>{'>'}</Text> Increment the data pointer (to point to the next cell to the right</Text>
        <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>{'<'}</Text> Decrement the data pointer (to point to the next cell to the left)</Text>
      </Flex>
      <Flex justifyContent="space-evenly" sx={{marginBottom: '4px'}}>
        <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>+</Text> Increment (increase by one) the byte at the data pointer</Text>
        <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>-</Text> Decrement (decrease by one) the byte at the data pointer</Text>
      </Flex>
      <Flex justifyContent="space-evenly" sx={{marginBottom: '4px'}}>
        <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>,</Text> Accept a byte of input, store its value in byte at the data pointer</Text>
        <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>.</Text> Output the value of the byte at the data pointer</Text>
      </Flex>
      <Flex justifyContent="space-evenly" sx={{marginBottom: '4px'}}>
        <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>[</Text> If the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command</Text>
        <Text width="45%" color='text'><Text fontSize={[ 4 ]} color='secondary'>]</Text> If the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command</Text>
      </Flex>
      <Flex px={2} pt={4} pb={2}>
        <Text mb="6px" fontSize={[ 3, 4 ]} color='secondary'>Special Commands</Text>
      </Flex>
      <Flex px={2}>
        <Text color='text'><Text fontSize={[ 4 ]} color='primary'>$</Text> Shortcut added for debugging purposes. Writes to the dev console.</Text>
      </Flex>
      <Flex px={2} py={4}>
        <Text color='text'><Text fontSize={[ 4 ]} color='primary'>#</Text> Placed on the first line of a file to specify options for the compiler.</Text>
      </Flex>
      <Box px={[ 12 ]}>
        <Text color='text'><Text fontSize={[ 2 ]} color='primary' mb={[ 2 ]}>#printMode={'<option>'}</Text>&nbsp; With 'option' being either "literal" or "fromCharCode". <i className="fa fa-question-circle" aria-hidden="true" title='`fromCharCode` runs the value through "String.fromCharCode(value)" which is useful for printing out more than just numbers from your program.'></i><Text color='secondary' mt={[ 1.5 ]}>&nbsp; default = literal</Text></Text>
        <br />
        <Text color='text'><Text fontSize={[ 2 ]} color='primary' mb={[ 2 ]}>#maxDepth={'<number>'}</Text>&nbsp; Set the max number of cycles allowed in the main interpreter loop. <i className="fa fa-question-circle" aria-hidden="true" title='Check out the fibonacci example to see this in use. (Try setting it down to 60000 in that example).'></i><Text color='secondary' mt={[ 1.5 ]}>&nbsp; default = 30000</Text></Text>
      </Box>
    </Box>
  </Flex>
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
