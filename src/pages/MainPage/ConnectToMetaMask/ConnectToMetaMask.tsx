import React from 'react';
import { Button } from '@mui/material';
import { useMetaMask } from '../../../hooks/useMetaMask';
import './ConnectToMetaMask.scss';

export const ConnectToMetaMask: React.FC = () => {
  const { connectMetaMask } = useMetaMask();
  return (
    <div className="connect-to-meta-mask">
      <Button
        variant="contained"
        size={'medium'}
        color={'secondary'}
        onClick={() => connectMetaMask()}
        sx={{
          height: '50px',
          marginTop: '5px',
          fontWeight: 'bold',
          fontSize: '16px',
          width: '200px',
        }}
      >
        Connect
      </Button>
    </div>
  );
};
