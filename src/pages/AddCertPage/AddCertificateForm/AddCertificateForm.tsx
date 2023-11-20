import React, { useState } from 'react';
import './AddCertificateForm.scss';
import { Input } from '../../../components/Input/Input';
import { Button } from '@mui/material';
import { BlockchainService } from '../../../ethereum/BlockchainService';
import { useGetFileHash } from '../../../hooks/useFileReader';
import { FileUploadButton } from '../../../components/FileUploadButton/FileUploadButton';

export const AddCertificateForm = () => {
  const [receiverName, setReceiverName] = useState<string>('');
  const [receiverLastName, setReceiverLastName] = useState<string>('');
  const [certUrl, setCertUrl] = useState<string>('');
  const [certDuration, setCertDuration] = useState<string>('');
  const [fileName, setFileName] = useState<string | undefined>(undefined);

  const [hash, getHash] = useGetFileHash();

  const submitForm = (): void => {
    if (hash) {
      const service = new BlockchainService();
      service
        .addCertificate(
          hash,
          receiverName,
          receiverLastName,
          certDuration,
          certUrl,
        )
        .then((r) => console.log(r))
        .catch((e) => {
          console.log(e);
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
    <div className={'add-certificate-form'}>
      <span className={'add-certificate-form__header'}>Add certificate</span>
      <div className={'add-certificate-form__content'}>
        <Input
          label={'Receiver name'}
          id={'receiverName'}
          required={true}
          onChange={setReceiverName}
        />
        <Input
          label={'Receiver last name'}
          id={'receiverLastName'}
          required={true}
          onChange={setReceiverLastName}
        />
        <Input
          label={'Cert duration'}
          id={'certDuration'}
          type="number"
          required={true}
          onChange={setCertDuration}
        />
        <Input
          label={'Cert url'}
          id={'certUrl'}
          required={false}
          onChange={setCertUrl}
        />
        <FileUploadButton fileName={fileName} onChange={handleOnChange} />
        <Button
          variant="contained"
          type={'submit'}
          size={'medium'}
          onClick={() => submitForm()}
          sx={{ height: '50px', marginTop: '5px', fontWeight: 'bold' }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
