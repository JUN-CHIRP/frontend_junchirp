'use client';

import AuthGuard from '@/shared/components/AuthGuard/AuthGuard';
import { ReactElement } from 'react';

export default function Profile(): ReactElement {
  return (
    <AuthGuard requireVerified>
      <div>Profile page</div>
    </AuthGuard>
  );
}
