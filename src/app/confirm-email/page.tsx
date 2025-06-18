import AuthGuard from '../../shared/components/AuthGuard/AuthGuard';
import { ReactElement } from 'react';

export default function ConfirmEmail(): ReactElement {
  return (
    <AuthGuard>
      <div>Confirm email page</div>
    </AuthGuard>
  );
}
