import React, {useState} from "react";
import "./AddCertificateForm.scss"
import { Input } from "../../../components/Input/Input";
import {Button} from "@mui/material";
import {SepoliaService} from "../../../ethereum/SepoliaService";

export const AddCertificateForm = () => {
    const [receiverName, setReceiverName] = useState<string>("");
    const [receiverLastName, setReceiverLastName] = useState<string>("");
    const [certUrl, setCertUrl] = useState<string>("");
    const [walletAddress, setWalletAddress] = useState<string>("");


    const submitForm =  () : void => {
        const sepoliaService = new SepoliaService();
        sepoliaService.addCertificate("gabrysia1234", receiverName, receiverLastName)
            .then(r => console.log(r))
            .catch((e) => { console.log(e)});
    }

    return (
        <div className={'add-certificate-form'}>
            <span className={'add-certificate-form__header'}>Add certificate</span>
            <div className={'add-certificate-form__content'}>
                <Input label={'Receiver name'} id={'receiverName'} required={true} onChange={setReceiverName}/>
                <Input label={'Receiver last name'} id={'receiverLastName'} required={true} onChange={setReceiverLastName}/>
                <Input label={'Cert url'} id={'certUrl'} required={false} onChange={setCertUrl}/>
                <Input label={'Wallet address'} id={'walletAddress'} required={false} onChange={setWalletAddress}/>
                <Button variant="contained" type={'submit'} size={'medium'} onClick={() => submitForm()}
                        sx={{height: '50px', marginTop: '5px'}}>Add</Button>
            </div>
        </div>
    )
};
