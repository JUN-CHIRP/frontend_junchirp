'use client';

import React, { ReactElement, Suspense } from 'react';
import SocialButton from '../SocialButton/SocialButton';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconOnly?: boolean;
  fullWidth?: boolean;
}

export default function GoogleAuthButton({
  iconOnly = false,
  fullWidth = false,
}: ButtonProps): ReactElement {
  return (
    <Suspense fallback={null}>
      <SocialButton social="google" fullWidth={fullWidth} iconOnly={iconOnly} />
    </Suspense>
  );
}
