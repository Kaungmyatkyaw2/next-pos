import localFont from 'next/font/local';

export const HelveticaNowText = localFont({
  src: [
    {
      path: './font/HelveticaNowText/HelveticaNowText-Regular.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: './font/HelveticaNowText/HelveticaNowText-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-HelveticaNowText--',
});
