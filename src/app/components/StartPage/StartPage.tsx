import Hero from './Hero/Hero';
import NextLevel from './NextLevel/NextLevel';
import Quote from './Quote/Quote';
import ThreeSteps from './ThreeSteps/ThreeSteps';
import WhatWeNeed from './WhatWeNeed/WhatWeNeed';
import YourMoment from './YourMoment/YourMoment';
import { ReactElement } from 'react';

export default function StartPage(): ReactElement {
  return (
    <div>
      <Hero />
      <Quote />
      <ThreeSteps />
      <WhatWeNeed />
      <NextLevel />
      <YourMoment />
    </div>
  );
}
