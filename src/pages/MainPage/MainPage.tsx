import React from 'react';
import './MainPage.scss';
import { ConnectToMetaMask } from './ConnectToMetaMask/ConnectToMetaMask';
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
    <div className={'page-layout'}>
      {isConnected ? <LinksContainer /> : <ConnectToMetaMask />}
    </div>
  );
};
