export interface CertResponse {
  checksum: string;
  issueDate: Date | string;
  expireDate: Date | string;
  issuer: string;
  certUrl: string;
  firstName: string;
  secondName: string;
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
        : new Date(parseInt(obj[1]) * 1000),
      expireDate: Array.isArray(obj[2])
        ? obj[1]
        : new Date(parseInt(obj[2]) * 1000),
      issuer: obj[3],
      certUrl: obj[4],
      firstName: obj[5][0],
      secondName: obj[5][1],
    };
  };

  export const IsValidCert = (checksum: string, expireDate: string | Date) => {
    const isExpired = expireDate < new Date();
    const exist = checksum.length > 0;

    return exist && !isExpired;
  };
}

export interface CertBulkDto {
  checksum: string,
  recipientName: string,
  recipientSurname: string,
  daysValid: number,
  certUrl: string,
  owner: string
}