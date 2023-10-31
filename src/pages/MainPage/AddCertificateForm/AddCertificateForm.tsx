import React from "react";
import "./AddCertificateForm.scss"
import { Input } from "../../../components/Input/Input";
import {Button} from "@mui/material";

export const AddCertificateForm = () => (
    <form className={'add-certificate-form'}>
        <span className={'add-certificate-form__header'}>Add certificate</span>
        <div className={'add-certificate-form__content'}>
            <Input label={'Receiver name'} id={'receiverName'} required={true}/>
            <Input label={'Receiver last name'} id={'receiverLastName'} required={true}/>
            <Input label={'Cert url'} id={'certUrl'} required={true}/>
            <Input label={'Wallet address'} id={'walletAddress'} required={true}/>
            <Button variant="contained" type={'submit'} size={'medium'} sx={{ height: '50px', marginTop: '5px'}}>Add</Button>
        </div>
    </form>
);
