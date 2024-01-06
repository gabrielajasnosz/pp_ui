import React from 'react';
import './MainPage.scss';
import { useMetaMask } from '../../hooks/useMetaMask';
import { LinksContainer } from './LinksContainer/LinksContainer';
import { ConnectToMetaMask } from './ConnectToMetaMask/ConnectToMetaMask';
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
      {!isConnected && <ConnectToMetaMask />}
      <LinksContainer />
    </div>
  );
};
