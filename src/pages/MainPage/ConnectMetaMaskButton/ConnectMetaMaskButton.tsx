import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useMetaMask } from '../../../hooks/useMetaMask'

export const ConnectMetaMaskButton: React.FC = () => {
  const { isConnecting, connectMetaMask } = useMetaMask()

  return (
    <>
      {isConnecting ? (
        'Connecting...'
      ) : (
        <Button
          variant="contained"
          size={'medium'}
          onClick={() => connectMetaMask()}
        >
          Connect
        </Button>
      )}
    </>
  )
}
