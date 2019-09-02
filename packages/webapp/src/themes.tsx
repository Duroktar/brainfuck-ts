import { theme as dark } from './app/theme.dark';
import { theme as light } from './app/theme.light';

export const presets: Record<Theme, any> = {
  dark,
  light,
};

export const themes: Theme[] = [
  'dark',
  'light',
];

export type Theme = 'dark' | 'light';
