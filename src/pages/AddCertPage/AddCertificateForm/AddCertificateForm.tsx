import React, { useState } from 'react';
import { Input } from '../../../components/Input/Input';
import { Box, Button, LinearProgress } from '@mui/material';
import { BlockchainService } from '../../../ethereum/BlockchainService';
import { useGetFileHash } from '../../../hooks/useFileReader';
import { FileUploadButton } from '../../../components/FileUploadButton/FileUploadButton';
import {
  CustomSnackbar,
  SnackbarType,
} from '../../../components/CustomSnackbar/CustomSnackbar';

export const AddCertificateForm = () => {
  const [receiverName, setReceiverName] = useState<string>('');
  const [receiverLastName, setReceiverLastName] = useState<string>('');
  const [certUrl, setCertUrl] = useState<string>('');
  const [certDuration, setCertDuration] = useState<string>('');
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
      const service = new BlockchainService();
      setIsLoading(true);
      service
        .addCertificate(
          hash,
          receiverName,
          receiverLastName,
          certDuration,
          certUrl,
        )
        .then((r) => {
          setIsLoading(false);
          setSnackbar({
            opened: true,
            message: 'Certificate added successfully',
            messageType: 'success',
          });
        })
        .catch((e) => {
          setSnackbar({
            opened: true,
            message: 'Error while adding certificate.',
            messageType: 'error',
          });
          setIsLoading(false);
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
      <span className={'form-layout__header'}>Add certificate</span>
      <div className={'form-layout__content'}>
        <Input
          label={'Receiver name'}
          required={true}
          onChange={setReceiverName}
        />
        <Input
          label={'Receiver last name'}
          required={true}
          onChange={setReceiverLastName}
        />
        <Input
          label={'Cert duration'}
          type="number"
          required={true}
          onChange={setCertDuration}
        />
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
            className="confirm-button"
          >
            Add
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
