import { BaseContract } from "ethers";

export interface CertificateRepository extends BaseContract {
    getCertificate(_checksum: string): Promise<string>;
    addTrustedIssuer(_issuer: string): Promise<string>;
    addCertificate(_checksum: string, _recipient_name: string, _recipient_surname: string, _days_valid: number, _cert_url: string): Promise<any>
    removeTrustedIssuer(_issuer: string): Promise<any>;
}