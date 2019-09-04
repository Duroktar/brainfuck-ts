import { theme as dark } from './app/theme.dark';
import { theme as light } from './app/theme.light';

export type Theme = typeof dark | typeof light;
export type ThemeName = 'dark' | 'light';

export const presets: Record<ThemeName, any> = {
  dark,
  light,
};

export const themes: ThemeName[] = [
  'dark',
  'light',
];
