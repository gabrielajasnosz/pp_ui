import React, { useState } from 'react';
import { Input } from '../../components/Input/Input';
import { Box, Button, LinearProgress } from '@mui/material';
import { BlockchainService } from '../../ethereum/BlockchainService';
import {
  CustomSnackbar,
  SnackbarType,
} from '../../components/CustomSnackbar/CustomSnackbar';

export const RemoveAdminPage = () => {
  const [adminAddress, setAdminAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarType>({
    opened: false,
    message: '',
    messageType: 'success',
  });

  const submitForm = (): void => {
    const service = new BlockchainService();
    service
      .removeAdmin(adminAddress)
      .then((r) => {
        setIsLoading(false);
        setSnackbar({
          opened: true,
          message: 'Admin removed successfully.',
          messageType: 'success',
        });
      })
      .catch((e) => {
        setSnackbar({
          opened: true,
          message: 'Error while removing admin.',
          messageType: 'error',
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="page-layout">
      <div className={'form-layout'}>
        <span className={'form-layout__header'}>Remove admin</span>
        <div className={'form-layout__content'}>
          <Input
            label={'Admin address'}
            required={true}
            onChange={setAdminAddress}
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
              disabled={!adminAddress}
              className="confirm-button"
            >
              Remove admin
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
