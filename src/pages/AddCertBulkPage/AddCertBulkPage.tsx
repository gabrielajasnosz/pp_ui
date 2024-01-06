import React, { useEffect, useState } from 'react';
import {CertBulkDto, CertificateEmailRequest} from '../../utils';
import { FileUploadButton } from '../../components/FileUploadButton/FileUploadButton';
import { Box, Button, LinearProgress } from '@mui/material';
import {addCertificates, sendEmailsBulk} from '../../services/CertificateService';
import { BlockchainService } from '../../ethereum/BlockchainService';
import {
  CustomSnackbar,
  SnackbarType,
} from '../../components/CustomSnackbar/CustomSnackbar';
import { Input } from '../../components/Input/Input';
import { Cert } from '../../ethereum/CertificateRepository';

export const AddCertBulkPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarType>({
    opened: false,
    message: '',
    messageType: 'success',
  });
  const [issuerName, setIssuerName] = useState<string | undefined>(undefined);
  const [backendResponse, setBackendResponse] = useState<any[]>();

  const subscribe = () => {
    let eventsCounter = 0;
    const service = new BlockchainService();
    const certificates: CertificateEmailRequest[] = [];

    service
      .subscribeToEvent(
        'SuccessfullyAddedCertificate(string,string,string,string,string,string)',
        (index, checksum, recipient_name, recipient_surname, recipient_email, issuer_identification_name) => {
          if (
            backendResponse!.some(
              (x) => x.checksum === checksum
            )
          ) {
            eventsCounter += 1;

            certificates.push({
                checksum: checksum,
                recipientName: recipient_name,
                recipientSurname: recipient_surname,
                recipientEmail: recipient_email,
                issuer: issuer_identification_name,
            });

            if (eventsCounter === backendResponse!.length) {
              sendEmailsBulk(certificates)
                  .then(()=> {})
                  .catch((e) => console.log(e))

              setIsLoading(false);
              setSnackbar({
                opened: true,
                message: 'Certificates added successfully',
                messageType: 'success',
              });
              service.removeListeners().then(() => {});
            }
          }
        },
      )
      .then(() => {});
  };

  useEffect(() => {
    if (backendResponse) {
      subscribe();
    }
  }, [backendResponse]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // @ts-ignore
    setFile(file);
    if (file) {
      setFileName(file.name);
    }
  };

  const submit = () => {
    const formData = new FormData();
    setIsLoading(true);
    // @ts-ignore
    formData.append('file', file);
    formData.append('issuer', issuerName!);
    addCertificates(formData)
      .then((r) => {
        setBackendResponse(r);
        const service = new BlockchainService();
        const certData: Cert[] = r.map((entry: CertBulkDto) => {
          return {
            checksum: entry.checksum,
            recipient: {
              name: entry.recipientName,
              email: entry.recipientEmail,
              surname: entry.recipientSurname,
            },
            days_valid: entry.daysValid,
            cert_name: entry.certName,
            issuer_identification_name: entry.issuer,
          };
        });

        service
          .bulkUploadCertificates(certData)
          .then(() => {})
          .catch((e) => {
            console.log(e);
            setIsLoading(false);
            setSnackbar({
              opened: true,
              message: 'Error while adding certificates.',
              messageType: 'error',
            });
          });
      })
      .catch((e) => {
          console.log(e);
          setIsLoading(false);
          setSnackbar({
            opened: true,
            message: 'Certificates data validation failed! Check CSV file.',
            messageType: 'error',
          });
        });
  };

  return (
    <div className={'page-layout'}>
      <div className={'form-layout'}>
        <span className={'form-layout__header'}>Add certificates from CSV</span>
        <div className={'form-layout__content'}>
          <Input
            label={'Issuer name'}
            required={true}
            onChange={setIssuerName}
          />
          <FileUploadButton
            fileName={fileName}
            onChange={handleOnChange}
            label={'Upload csv file'}
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
              disabled={!file || !issuerName}
              onClick={() => submit()}
              className="confirm-button"
            >
              Add
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
