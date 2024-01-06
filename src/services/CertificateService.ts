import {CertificateEmailRequest} from "../utils";

export const SERVICE_URL = "http://localhost:8080/pp";

export const addCertificates = (formData: FormData) =>
  fetch(SERVICE_URL + "/certificates", {
    method: "POST",
    body: formData,
  }).then((response) => {
      if(!response.ok) {
          return response.text().then(text => {
              throw new Error(text)
          })
      } else {
          return response.json();
      }

  });

export const sendEmail = (formData: FormData) =>
  fetch(SERVICE_URL + "/emails", {
    method: "POST",
    body: formData,
  }).then((response) => response.json());

export const sendEmailsBulk = (certificates: CertificateEmailRequest[]) =>
    fetch(SERVICE_URL + "/emails/bulk", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(certificates),
    });
