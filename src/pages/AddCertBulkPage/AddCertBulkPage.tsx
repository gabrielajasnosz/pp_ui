import React, { useState } from 'react'
import { CertBulkDto, CertResponse } from '../../utils'
import { FileUploadButton } from '../../components/FileUploadButton/FileUploadButton'
import { Button } from '@mui/material'
import { addCertificates } from '../../services/CertificateService'
import { BlockchainService } from '../../ethereum/BlockchainService'

export const AddCertBulkPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState<string | undefined>();

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
  // @ts-ignore
  formData.append("file", file);
  formData.append("issuer", "PK")
    addCertificates(formData)
      .then((r) => {
        const obj: CertBulkDto[] = r;
        console.log("response");
        console.log(obj);
        
        const certData: string[][] = obj.map(cert => [
          cert.checksum,
          cert.recipientName,
          cert.recipientSurname,
          cert.daysValid.toString(),
          "URL",
          "PK"
        ]);
        
        console.log("CertData");
        console.log(certData);

        const service = new BlockchainService();
        service
          .bulkUploadCertificates(certData)
          .then((r) => {
            console.log("SUCCESS");
          })
          .catch((e) => {
            console.log("FAILURE");
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
      </div>
    </div>
  </div>
)};
