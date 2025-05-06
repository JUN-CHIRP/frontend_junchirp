import React from 'react';
import Logo from '@/components/ui/Logo/Logo';
import Button from '@/components/ui/Button/Button';

export default function Header() {
  return (
    <section className="px-padding-section py-padding-header">
      <div className="container">
        {/* <h2 className="font-[SF Pro Text] font-bold">Header</h2> */}
        <div className="flex justify-between items-center">
          <Logo />
          <Button text="Увійти" />
        </div>
      </div>
    </section>
  );
}
