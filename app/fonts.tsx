import { Lato } from 'next/font/google';

import { Archivo_Black } from 'next/font/google';

import { Montserrat } from 'next/font/google';

import localFont from 'next/font/local';

export const ttCommons = localFont({
  src: [
    {
      path: './fonts/Fontspring-DEMO-tt_commons_pro_condensed_bold.otf',
      weight: '400',
      style: 'normal',
    },
    
    // Add other styles like Italics or Variable versions if available
  ],
  variable: '--font-tt-commons', // Define a CSS variable for Tailwind integration
  display: 'swap', // Prevents layout shift
});


export const suisse = localFont({
  src: [
    {
      path: './fonts/SuisseIntlCondTrial-Medium.otf',
      weight: '400'
      
      
    },
     {
      path: './fonts/SuisseIntlCondTrial-Light.otf',
       weight: '200'
      
      
    },
    {
      path: './fonts/SuisseIntlCondTrial-Bold.otf',
       weight: '600'
      
      
    },
     {
      path: './fonts/SuisseIntlCondTrial-SemiBold.otf',
       weight: '500'
      
      
    },

    
    
    // Add other styles like Italics or Variable versions if available
  ],
  variable: '--font-suisse-book', // Define a CSS variable for Tailwind integration
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