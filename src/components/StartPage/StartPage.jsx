import React from 'react';
import Hero from '@/components/StartPage/Hero/Hero';
import Quote from '@/components/StartPage/Quote/Quote';
import ThreeSteps from '@/components/StartPage/ThreeSteps/ThreeSteps';
import WhatWeNeed from '@/components/StartPage/WhatWeNeed/WhatWeNeed';
import NextLevel from '@/components/StartPage/NextLevel/NextLevel';
import YourMoment from '@/components/StartPage/YourMoment/YourMoment';

export default function StartPage() {
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
