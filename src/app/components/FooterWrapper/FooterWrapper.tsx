'use client';

import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

const Footer = dynamic(() => import('./components/Footer/Footer'), {
  ssr: false,
});

export default function FooterWrapper(): ReactElement {
  return <Footer />;
}
