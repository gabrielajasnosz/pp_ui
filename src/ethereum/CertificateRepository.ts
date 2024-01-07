import { BaseContract } from 'ethers';

type Recipient = {
  name: string;
  surname: string;
  email: string;
};

export type Cert = {
  checksum: string;
  recipient: Recipient;
  days_valid: number;
  cert_name: string;
  issuer_identification_name: string;
};

export interface CertificateRepository extends BaseContract {
  getCertificate(_checksum: string): Promise<string>;
  addTrustedIssuer(_issuer: string): Promise<string>;
  addCertificate(
    _checksum: string,
    _recipient: Recipient,
    _days_valid: number,
    _cert_name: string,
    _issuer_identification_name: string,
  ): Promise<any>;
  bulkUploadCertificates(_bulkData: Cert[]): Promise<any>;
  removeTrustedIssuer(_issuer: string): Promise<any>;
  isTrustedIssuer(_issuer: string): Promise<any>;
  isAdmin(_admin: string): Promise<any>;
  isContractOwner(_owner: string): Promise<any>;
  addAdmin(_admin: string): Promise<any>;
  removeAdmin(_admin: string): Promise<any>;
  getCertificatesIssuedBy(_issuer: string): Promise<any>;
  invalidate(_checksum: string): Promise<any>;
}
