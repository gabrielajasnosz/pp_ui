export interface CertResponse {
  checksum: string;
  issueDate: Date | string;
  expireDate: Date | string;
  issuer: string;
  certName: string;
  firstName: string;
  secondName: string;
  email: string;
}

export namespace Utils {
  export const toObject = (r: any) => {
    return JSON.parse(
      JSON.stringify(r, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    );
  };

  export const convertRawToCertResponse = <T extends string>(
    obj: T,
  ): CertResponse => {
    return {
      checksum: obj[0],
      issueDate: Array.isArray(obj[1])
        ? obj[1]
        : //@ts-ignore
          new Date(parseInt(obj[1].hex) * 1000),
      //@ts-ignore
      expireDate: obj[2].hex ? new Date(parseInt(obj[2].hex) * 1000) : new Date(parseInt(obj[2]._hex) * 1000),
      issuer: obj[3],
      certName: obj[4],
      firstName: obj[5][0],
      secondName: obj[5][1],
      email: obj[5][2],
    };
  };

  export const IsValidCert = (checksum: string, expireDate: string | Date) => {
    const isExpired = expireDate < new Date();
    const exist = checksum.length > 0;

    return exist && !isExpired;
  };
}

export interface CertBulkDto {
  checksum: string;
  recipientName: string;
  recipientSurname: string;
  recipientEmail: string;
  daysValid: string;
  certName: string;
  issuer: string;
}

export interface CertificateEmailRequest {
  checksum: string;
  recipientName: string;
  recipientSurname: string;
  recipientEmail: string;
  issuer: string;
}
