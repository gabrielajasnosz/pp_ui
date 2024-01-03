import React, { useState } from 'react'
import { CertBulkDto } from '../../utils'
import { FileUploadButton } from '../../components/FileUploadButton/FileUploadButton'
import { Box, Button, LinearProgress } from '@mui/material'
import { addCertificates } from '../../services/CertificateService'
import { BlockchainService } from '../../ethereum/BlockchainService'
import { CustomSnackbar, SnackbarType } from '../../components/CustomSnackbar/CustomSnackbar'

export const AddCertBulkPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarType>({
    opened: false,
    message: '',
    messageType: 'success',
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
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
    formData.append("file", file);
    formData.append("issuer", "PK")
      addCertificates(formData)
        .then((r) => {
          const service = new BlockchainService();
          const obj: CertBulkDto[] = r;
          const certData: string[][] = obj.map(cert => [
            cert.checksum,
            cert.recipientName,
            cert.recipientSurname,
            cert.recipientEmail,
            cert.daysValid,
            cert.certName,
            cert.issuer
          ]);
          
          service
            .bulkUploadCertificates(certData)
            .then((r) => {
              setIsLoading(false);
              setSnackbar({
                opened: true,
                message: 'Certificates added successfully',
                messageType: 'success',
              });
              //console.log(r.events) when typed should return event when one or more record fail to load
            })
            .catch((e) => {
              setIsLoading(false);
              setSnackbar({
                opened: true,
                message: 'Error while adding certificates.',
                messageType: 'error',
              });
              console.log(e);
            });

        })
        .catch((e) => console.log(e));
  };

return (
  <div className={'page-layout'}>
    <div className={'form-layout'}>
      <span className={'form-layout__header'}>Add certificates from CSV</span>
      <div className={'form-layout__content'}>
        <FileUploadButton fileName={fileName} onChange={handleOnChange} label={'Upload csv file'} />
        {isLoading ? (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        ) : (
          <Button
            variant="contained"
            type="submit"
            size="medium"
            disabled={!file}
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
)};
