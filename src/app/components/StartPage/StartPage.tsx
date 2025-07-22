import Hero from './Hero/Hero';
import NextLevel from './NextLevel/NextLevel';
import Quote from './Quote/Quote';
import ThreeSteps from './ThreeSteps/ThreeSteps';
import WhatWeNeed from './WhatWeNeed/WhatWeNeed';
import YourMoment from './YourMoment/YourMoment';
import { ReactElement } from 'react';
import styles from './startPage.module.scss';

export default function StartPage(): ReactElement {
  return (
    <>
      <Hero />
      <Quote />
      <ThreeSteps />
      <WhatWeNeed />
      <NextLevel />
      <YourMoment />
    </>
  );
}
