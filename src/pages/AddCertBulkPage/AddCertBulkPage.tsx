import React, { useState } from 'react'
import { CertResponse } from '../../utils'
import { FileUploadButton } from '../../components/FileUploadButton/FileUploadButton'
import { Button } from '@mui/material'
import { addCerificates } from '../../services/CertificateService'

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
    addCerificates(formData)
      .then((r) => {
        console.log(r);
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
