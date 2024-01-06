import React from 'react';
import { Button } from '@mui/material';
import { useMetaMask } from '../../../hooks/useMetaMask';
import './ConnectToMetaMask.scss';

export const ConnectToMetaMask: React.FC = () => {
  const { connectMetaMask, isConnecting } = useMetaMask();
  return (
    <div className="connect-to-meta-mask">
      <div className={"connect-to-meta-mask__info"}>
        Connect to your metamask account
      </div>
      <Button
        variant="outlined"
        color={'primary'}
        disabled={isConnecting}
        onClick={() => connectMetaMask()}
        size={'small'}
        sx={{
          fontWeight: 'bold',
          fontSize: '16px',
          width: '100px',
        }}
      >
        Connect
      </Button>
    </div>
  );
};
