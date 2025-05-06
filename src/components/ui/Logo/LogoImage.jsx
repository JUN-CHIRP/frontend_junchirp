import React from 'react';

export default function LogoImage({ width, height, src }) {
  return <img width={`${width}px`} height={`${height}px`} src={src} />;
}
