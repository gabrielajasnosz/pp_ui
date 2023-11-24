import FormData from 'form-data';
import {FileResponse} from "./FileResponse";


export class FileUploader {
    constructor() {
    }

    public async uploadCertificate(file: File): Promise<FileResponse> {
        let headers = new Headers()
        headers.set('Content-Type', 'multipart/form-data')
        headers.set('Accept', 'application/json')

        const formData = new FormData();
        formData.append('file', file);

        const request: RequestInfo = new Request('https://file.io/', {
            method: 'POST',
            // @ts-ignore
            body: formData,
        })

        return fetch(request)
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(res => {
                return res as FileResponse
            })
    }
}
