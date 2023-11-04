import {BaseContract} from "ethers";

export interface CertificateRepository extends BaseContract {
    getCertificate(_checksum: string): Promise<any>;
}
