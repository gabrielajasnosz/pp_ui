import React, { useState } from 'react'
import './AddCertificateForm.scss'
import { Input } from '../../../components/Input/Input'
import { Button } from '@mui/material'
import { BlockchainService } from '../../../ethereum/BlockchainService'
import { useGetFileHash } from '../../../hooks/useFileReader'

export const AddCertificateForm = () => {
  const [receiverName, setReceiverName] = useState<string>('')
  const [receiverLastName, setReceiverLastName] = useState<string>('')
  const [certUrl, setCertUrl] = useState<string>('')
  const [certDuration, setCertDuration] = useState<string>('')

  const [hash, getHash] = useGetFileHash()

  const submitForm = (): void => {
    if (hash) {
      const service = new BlockchainService()
      service
        .addCertificate(
          hash,
          receiverName,
          receiverLastName,
          certDuration,
          certUrl
        )
        .then((r) => console.log(r))
        .catch((e) => {
          console.log(e)
        })
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      getHash(file)
    }
  }

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
        <input type="file" onChange={handleOnChange}></input>

        <Button
          variant="contained"
          type={'submit'}
          size={'medium'}
          onClick={() => submitForm()}
          sx={{ height: '50px', marginTop: '5px' }}
        >
          Add
        </Button>
      </div>
    </div>
  )
}
