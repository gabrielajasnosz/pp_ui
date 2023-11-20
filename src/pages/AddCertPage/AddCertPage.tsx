import React from 'react';
import './AddCertPage.scss';
import { AddCertificateForm } from '../AddCertPage/AddCertificateForm/AddCertificateForm';
import { ConnectToMetaMask } from '../MainPage/ConnectToMetaMask/ConnectToMetaMask';
import { useMetaMask } from '../../hooks/useMetaMask';

export const AddCertPage = () => {
  const {
    wallet: { accounts },
    hasProvider,
  } = useMetaMask();

  const isConnected = React.useMemo(
    () => hasProvider && accounts.length > 0,
    [hasProvider, accounts],
  );

  return (
    <div className={'main-page'}>
      {isConnected ? <AddCertificateForm /> : <ConnectToMetaMask />}
    </div>
  );
};
