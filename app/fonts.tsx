import { Lato } from 'next/font/google';

import { Archivo_Black } from 'next/font/google';

export const archivo = Archivo_Black({
  subsets: ['latin'],
  weight: '400', 
  display: 'swap',
});

export const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
});