export class MailSender {
    constructor() {
    }

    public async sendMail(name: String, lastname: String, link: String) {
        const headers: Headers = new Headers()
        headers.set('Content-Type', 'application/json')
        headers.set('Accept', 'application/json')

        const request: RequestInfo = new Request('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                service_id: "CertificateRepository",
                template_id: "template_1",
                user_id: "1kwLSJ8Tn7WusClY1",
                template_params: {
                    to_name: name,
                    to_email: lastname,
                    link: link
                }
            })
        })

        return fetch(request)
            .then(res => {
                console.log(res)
            })
    }
}
