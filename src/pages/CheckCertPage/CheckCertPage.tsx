import React, { useState } from 'react';
import { useGetFileHash } from '../../hooks/useFileReader';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { BlockchainService } from '../../ethereum/BlockchainService';
import './CheckCertPage.scss';
import { FileUploadButton } from '../../components/FileUploadButton/FileUploadButton';
import { Utils, CertResponse } from '../../utils';

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
          setResponse(Utils.convertRawToCertResponse(Utils.toObject(r)));
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div className={'contract-page'}>
      <div className={'form-layout'}>
        <span className={'form-layout__header'}>Check certificate status</span>
        <div className={'form-layout__content'}>
          <FileUploadButton
            fileName={fileName}
            onChange={handleOnChange}
            label={'Upload pdf file'}
          />
          <Button
            variant="contained"
            type="submit"
            size="medium"
            disabled={!hash}
            onClick={() => submit()}
            className="confirm-button"
          >
            Check
          </Button>
        </div>
      </div>

      {response && (
        <div className={'check-contract-data'}>
          <div className={'check-contract-data__content'}>
            <TableContainer aria-sort={'none'}>
              <Table>
                <TableBody>
                  {Utils.IsValidCert(response.checksum, response.expireDate) ? (
                    <>
                      <TableRow>
                        <TableCell>Certificate status</TableCell>
                        <TableCell
                          sx={{ color: '#259a02', fontWeight: 'bold' }}
                        >
                          VALID
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Receiver</TableCell>
                        <TableCell>
                          {response.firstName} {response.secondName}{' '}
                          {response.email}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Issue date</TableCell>
                        <TableCell>{response.issueDate.toString()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Expire date</TableCell>
                        <TableCell>{response.expireDate.toString()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Checksum</TableCell>
                        <TableCell>{response.checksum}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Issuer</TableCell>
                        <TableCell>{response.issuer}</TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <TableRow>
                      <TableCell sx={{ width: '50px' }}>
                        Certificate status
                      </TableCell>
                      <TableCell sx={{ color: '#d01111', fontWeight: 'bold' }}>
                        INVALID
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
};
