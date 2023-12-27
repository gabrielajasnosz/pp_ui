export const SERVICE_URL = "http://localhost:8080";

export const addCerificates = (formData: FormData) =>
  fetch(SERVICE_URL + "/pp/generate", {
    method: "POST",
    body: formData,
  }).then((response) => response.json());