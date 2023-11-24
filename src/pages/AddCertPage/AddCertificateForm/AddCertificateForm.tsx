import React, { useState } from 'react'
import './AddCertificateForm.scss'
import { Input } from '../../../components/Input/Input'
import { Button } from '@mui/material'
import { BlockchainService } from '../../../ethereum/BlockchainService'
import { useGetFileHash } from '../../../hooks/useFileReader'
import {MailSender} from "../../../mail/MailSender";
import {FileUploader} from "../../../files/FileUploader";

export const AddCertificateForm = () => {
  const [receiverName, setReceiverName] = useState<string>('')
  const [receiverLastName, setReceiverLastName] = useState<string>('')
  const [certUrl, setCertUrl] = useState<string>('')
  const [certDuration, setCertDuration] = useState<string>('')

  const [hash, getHash] = useGetFileHash()
  const [file, setFile] = useState<File | null>(null);

  const submitForm = (): void => {
    if (!file) {
      console.error('No file selected');
      return;
    }
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
        .then((r) => {
          console.log(r);
          const fileUploader = new FileUploader()
          fileUploader.uploadCertificate(file)
              .then(res => {
                console.log(res);
                const mailSender = new MailSender();
                mailSender.sendMail(receiverName, receiverLastName, res.link) // LAST NAME WORKS AS EMAIL RIGHT NOW (NO VALIDATION)
                    .then(r => console.log(r))
                    .catch((e) => {console.log(e)});
              })
              .catch((e) => {console.log(e)});
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file);
      getHash(file);
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
