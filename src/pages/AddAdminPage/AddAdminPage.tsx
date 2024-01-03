import React, { useState } from 'react';
import { Input } from '../../components/Input/Input';
import { Box, Button, LinearProgress } from '@mui/material';
import { BlockchainService } from '../../ethereum/BlockchainService';
import {
  CustomSnackbar,
  SnackbarType,
} from '../../components/CustomSnackbar/CustomSnackbar';

export const AddAdminPage = () => {
  const [newAdminAddress, setNewAdminAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarType>({
    opened: false,
    message: '',
    messageType: 'success',
  });

  const submitForm = (): void => {
    const service = new BlockchainService();
    setIsLoading(true);
    service
      .addAdmin(newAdminAddress)
      .then(() => {
        setIsLoading(false);
        setSnackbar({
          opened: true,
          message: 'Admin added successfully.',
          messageType: 'success',
        });
      })
      .catch(() => {
        setSnackbar({
          opened: true,
          message: 'Error while adding admin.',
          messageType: 'error',
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="page-layout">
      <div className={'form-layout'}>
        <span className={'form-layout__header'}>Add admin</span>
        <div className={'form-layout__content'}>
          <Input
            label={'New admin address'}
            required={true}
            onChange={setNewAdminAddress}
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
              disabled={!newAdminAddress}
              className="confirm-button"
            >
              Add admin
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
