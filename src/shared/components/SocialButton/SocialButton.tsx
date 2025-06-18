'use client';

import styles from './SocialButton.module.scss';
import React, { ReactElement } from 'react';
import Image from 'next/image';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconOnly?: boolean;
  social: 'google' | 'facebook';
  fullWidth?: boolean;
}

const buttonData = {
  google: {
    text: 'Продовжити з Google',
    iconSrc: '/images/google.svg',
  },
  facebook: {
    text: 'Продовжити з Facebook',
    iconSrc: '/images/google.svg',
  },
};

export default function SocialButton({
  social,
  iconOnly = false,
  onClick,
  fullWidth = false,
}: ButtonProps): ReactElement {
  const className = [
    styles['social-button'],
    styles[`social-button--${social}`],
    fullWidth && styles['social-button--full'],
    iconOnly && styles['social-button--icon-button'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={className} onClick={onClick}>
      <Image
        src={buttonData[social].iconSrc}
        alt={social}
        width={24}
        height={24}
      />
      {!iconOnly ? <span>{buttonData[social].text}</span> : null}
    </button>
  );
}
