import React, { useState } from 'react'
import { Input } from '../../components/Input/Input'
import { Button } from '@mui/material'
import { BlockchainService } from '../../ethereum/BlockchainService'

export const AddIssuerPage = () => {
  const [newIssuerAddress, setNewIssuerAddress] = useState<string>('');

  const submitForm = (): void => {
    console.log(newIssuerAddress)
      const service = new BlockchainService();
      service.addTrustedIssuer(newIssuerAddress)
        .then((r) => console.log(r))
        .catch((e) => {
          console.log(e);
        });
  };

  return (
    <div className="main-page">
      <div className={'form-content'}>
        <span className={'form-content__header'}>Add issuer</span>
        <div className={'form-content__content'}>
          <Input
            label={'New issuer address'}
            id={'receiverName'}
            required={true}
            onChange={setNewIssuerAddress}
          />
          <Button
            variant="contained"
            type={'submit'}
            size={'medium'}
            onClick={submitForm}
            sx={{ height: '50px', marginTop: '5px', fontWeight: 'bold' }}
          >
            Add issuer
          </Button>
        </div>
      </div>
    </div>
  );
}
