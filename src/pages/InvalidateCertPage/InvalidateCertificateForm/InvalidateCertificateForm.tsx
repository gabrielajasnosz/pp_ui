import React, { useState } from 'react';
import { Box, Button, LinearProgress } from '@mui/material';
import { useGetFileHash } from '../../../hooks/useFileReader';
import { FileUploadButton } from '../../../components/FileUploadButton/FileUploadButton';
import {
  CustomSnackbar,
  SnackbarType,
} from '../../../components/CustomSnackbar/CustomSnackbar';
import { BlockchainService } from '../../../ethereum/BlockchainService';

export const InvalidateCertificateForm: React.FC = () => {
  const service = new BlockchainService();
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarType>({
    opened: false,
    message: '',
    messageType: 'success',
  });

  const [hash, getHash] = useGetFileHash();

  const submitForm = (): void => {
    if (hash) {
      setIsLoading(true);
      service
        .invalidateCertificate(hash)
        .then((_) => {
          setIsLoading(false);
          setSnackbar({
            opened: true,
            message: 'Certificate invalidated successfully',
            messageType: 'success',
          });
        })
        .catch((_) => {
          setSnackbar({
            opened: true,
            message: 'Error while invalidating certificate.',
            messageType: 'error',
          });
          setIsLoading(false);
        });
    } else {
      setSnackbar({
        opened: true,
        message: 'File is required.',
        messageType: 'error',
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      getHash(file);
    }
  };

  return (
    <div className={'form-layout'}>
      <span className={'form-layout__header'}>Invalidate certificate</span>
      <div className={'form-layout__content'}>
        <FileUploadButton fileName={fileName} onChange={handleOnChange} />
        {isLoading ? (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        ) : (
          <Button
            variant="contained"
            type="submit"
            size="medium"
            onClick={() => submitForm()}
            disabled={!hash}
            className="confirm-button"
          >
            Invalidate
          </Button>
        )}
      </div>
      <CustomSnackbar
        snackbarValues={snackbar}
        setSnackbarValues={setSnackbar}
      />
    </div>
  );
};
