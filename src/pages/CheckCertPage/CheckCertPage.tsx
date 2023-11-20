import React, { useState } from 'react';
import { useGetFileHash } from '../../hooks/useFileReader';
import { Button } from '@mui/material';
import { BlockchainService } from '../../ethereum/BlockchainService';
import { Utils } from './utils';
import './CheckCertPage.scss';
import { FileUploadButton } from '../../components/FileUploadButton/FileUploadButton';

export interface CertResponse {
  checksum: string;
  issueDate: Date | string;
  expireDate: Date | string;
  issuer: string;
  certUrl: string;
  firstName: string;
  secondName: string;
}

export const CheckCertPage: React.FC = () => {
  const [hash, getHash] = useGetFileHash();
  const [response, setResponse] = useState<CertResponse | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      getHash(file);
    }
  };

  const submit = () => {
    const service = new BlockchainService();
    if (hash) {
      service
        .getCertificate(hash)
        .then((r) => {
          setResponse(Utils.convertToResponse(Utils.toObject(r)));
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div className={'contract-page'}>
      <div className={'check-contract-form'}>
        <span className={'check-contract-form__header'}>
          Check certificate status
        </span>
        <div className={'check-contract-form__content'}>
          <FileUploadButton fileName={fileName} onChange={handleOnChange} />
          <Button
            variant="contained"
            type={'submit'}
            size={'medium'}
            onClick={() => submit()}
            sx={{ height: '50px', marginTop: '5px', fontWeight: 'bold' }}
          >
            Check
          </Button>
        </div>
      </div>

      {response && (
        <div className={'check-contract-data'}>
          <div className={'check-contract-data__content'}>
            {Utils.IsValidCert(response.checksum, response.expireDate) ? (
              <>
                <h2>Certificate is Valid</h2>
                {Object.entries(response).map(([key, value]) => (
                  <p className="row" key={key}>
                    <strong>{key.toUpperCase()}</strong>: {value.toString()}
                  </p>
                ))}
              </>
            ) : (
              <h2>Certificate is invalid</h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
