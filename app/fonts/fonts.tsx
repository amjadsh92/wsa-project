import { Lato } from 'next/font/google';

import { Archivo_Black } from 'next/font/google';

import { Montserrat } from 'next/font/google';

import localFont from 'next/font/local';

export const ttCommons = localFont({
  src: [
    {
      path: './fonts/Fontspring-DEMO-tt_commons_pro_black.otf',
      
      style: 'normal',
    },
    
    // Add other styles like Italics or Variable versions if available
  ],
  variable: '--font-tt-commons', // Define a CSS variable for Tailwind integration
  display: 'swap', // Prevents layout shift
});

export const archivo = Archivo_Black({
  subsets: ['latin'],
  weight: '400', 
  display: 'swap',
});

export const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const monteserrat =  Montserrat({
  subsets:['latin'],
  weight:['400','700']
})