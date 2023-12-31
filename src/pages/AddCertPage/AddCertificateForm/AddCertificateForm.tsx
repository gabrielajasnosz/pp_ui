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
import {sendEmail} from "../../../services/CertificateService";
import {CertificateEmailRequest} from "../../../utils";

export const AddCertificateForm = () => {
  const [file, setFile] = useState(null);
  const [receiverName, setReceiverName] = useState<string | undefined>('');
  const [receiverLastName, setReceiverLastName] = useState<
    string | undefined
  >();
  const [receiverEmail, setReceiverEmail] = useState<string | undefined>();
  const [certName, setCertName] = useState<string | undefined>();
  const [issuerName, setIssuerName] = useState<string | undefined>();
  const [certDuration, setCertDuration] = useState<string | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();
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
          receiverName!,
          receiverLastName!,
          receiverEmail!,
          certDuration!,
          certName!,
          issuerName!,
        )
        .then(() => {})
        .catch(() => {
          setSnackbar({
            opened: true,
            message: 'Error while adding certificate.',
            messageType: 'error',
          });
          setIsLoading(false);
        });
    }
  };

  const subscribeEvent = () => {
    const formData = new FormData();

    const service = new BlockchainService();
    service
      .subscribeToEvent(
        'SuccessfullyAddedCertificate(string,string,string,string,string,string)',
          (index, checksum, recipient_name, recipient_surname, recipient_email, issuer_identification_name) => {

          const certificate: CertificateEmailRequest = {
            checksum: checksum,
            recipientName: recipient_name,
            recipientSurname: recipient_surname,
            recipientEmail: recipient_email,
            issuer: issuer_identification_name,
          }

          // @ts-ignore
          formData.append('file', file);
          formData.append('emailRequest', JSON.stringify(certificate));

          sendEmail(formData)
              .then(()=>{})
              .catch((e)=>console.log(e));

          setIsLoading(false);
          setSnackbar({
            opened: true,
            message: 'Certificate added successfully',
            messageType: 'success',
          });
          service.removeListeners().then(() => {});
        },
      )
      .then(() => {});
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // @ts-ignore
    setFile(file);
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
          label={'Receiver email'}
          required={true}
          onChange={setReceiverEmail}
        />
        <Input
          label={'Validity duration'}
          type="number"
          required={true}
          onChange={setCertDuration}
        />
        <Input
          label={'Certificate name'}
          required={true}
          onChange={setCertName}
        />
        <Input label={'Issuer name'} required={true} onChange={setIssuerName} />
        <FileUploadButton
          fileName={fileName}
          onChange={handleOnChange}
          label={'Upload pdf file'}
        />
        {isLoading ? (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        ) : (
          <Button
            variant="contained"
            type="submit"
            size="medium"
            disabled={
              !receiverName ||
              !receiverLastName ||
              !receiverEmail ||
              !certName ||
              !certDuration ||
              !issuerName ||
              !fileName
            }
            onClick={() => {
              subscribeEvent();
              submitForm();
            }}
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
