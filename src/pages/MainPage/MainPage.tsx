import React from 'react';
import './MainPage.scss';
import { ConnectMetaMaskButton } from './ConnectMetaMaskButton/ConnectMetaMaskButton';
import { useMetaMask } from '../../hooks/useMetaMask';
import { LinksContainer } from './LinksContainer/LinksContainer';

export const MainPage = () => {
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
      {isConnected ? <LinksContainer /> : <ConnectMetaMaskButton />}
    </div>
  );
};
