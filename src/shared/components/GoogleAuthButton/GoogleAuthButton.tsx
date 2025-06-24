'use client';

import React, { ReactElement, Suspense } from 'react';
import SocialButton from '../SocialButton/SocialButton';
import { ToastMessage } from 'primereact/toast';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconOnly?: boolean;
  fullWidth?: boolean;
  message: ToastMessage;
}

export default function GoogleAuthButton({
  iconOnly = false,
  fullWidth = false,
  message,
}: ButtonProps): ReactElement {
  return (
    <Suspense fallback={null}>
      <SocialButton
        social="google"
        fullWidth={fullWidth}
        iconOnly={iconOnly}
        message={message}
      />
    </Suspense>
  );
}
