import React, { useState } from 'react';
import { Input } from '../../components/Input/Input';
import { Box, Button, LinearProgress } from '@mui/material';
import { BlockchainService } from '../../ethereum/BlockchainService';
import {
  CustomSnackbar,
  SnackbarType,
} from '../../components/CustomSnackbar/CustomSnackbar';

export const RemoveIssuerPage = () => {
  const [issuerAddress, setIssuerAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarType>({
    opened: false,
    message: '',
    messageType: 'success',
  });

  const submitForm = (): void => {
    const service = new BlockchainService();
    service
      .removeTrustedIssuer(issuerAddress)
      .then((r) => {
        setIsLoading(false);
        setSnackbar({
          opened: true,
          message: 'Trusted issuer removed successfully.',
          messageType: 'success',
        });
      })
      .catch((e) => {
        setSnackbar({
          opened: true,
          message: 'Error while adding trusted issuer.',
          messageType: 'error',
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="page-layout">
      <div className={'form-layout'}>
        <span className={'form-layout__header'}>Remove issuer</span>
        <div className={'form-layout__content'}>
          <Input
            label={'Issuer address'}
            required={true}
            onChange={setIssuerAddress}
          />
          {isLoading ? (
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          ) : (
            <Button
              variant="contained"
              type={'submit'}
              size={'medium'}
              onClick={submitForm}
              sx={{ height: '50px', marginTop: '5px', fontWeight: 'bold' }}
            >
              Remove issuer
            </Button>
          )}
        </div>
      </div>
      <CustomSnackbar
        snackbarValues={snackbar}
        setSnackbarValues={setSnackbar}
      />
    </div>
  );
};
