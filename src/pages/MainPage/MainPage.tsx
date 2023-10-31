import React from "react";
import "./MainPage.scss"
import { AddCertificateForm } from "./AddCertificateForm/AddCertificateForm";

export const MainPage = () => (
    <div className={'main-page'}>
        <AddCertificateForm />
    </div>
);
