import { ethers } from 'ethers';
import { CertificateRepository } from './CertificateRepository';
import { contractABI } from './ContractAbi';

export const CONTRACT_ADDRESS = '0xDa55F31fBFd645870AEbb2fa6F345c00E8844ee8';

export class BlockchainService {
  private readonly provider: ethers.BrowserProvider;
  private contractAddress: string;

  constructor() {
    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.contractAddress = CONTRACT_ADDRESS;
  }

  /**
        Function used to add certificate to blockchain.

        checkSum: string - generated checkSum value for deployed certificate file.

        returns: Promise object of string type
    */
  public async getCertificate(checkSum: string): Promise<string> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).getCertificate(checkSum);
  }

  /**
        Function used to add new trusted issuer. Only trusted issuers can perform this action.

        issuerAddress: string - wallet address of new trusted issuer.

        returns: Promise object of string type
    */
  public async addTrustedIssuer(issuerAddress: string): Promise<string> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).addTrustedIssuer(issuerAddress);
  }

  public async isTrustedIssuer(): Promise<string> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).isTrustedIssuer(signer.address);
  }

  /**
        Function used to add new certificate. Only trusted issuers can perform this action.

        checkSum: string - generated checkSum value for certificate file that will be deployed.
        recipientName: string - name of certificate owner.
        recipientSurname: string - surname of certificate owner.

        returns: Promise object of string type
    */
  public async addCertificate(
    checkSum: string,
    recipientName: string,
    recipientSurname: string,
    daysValid: string,
    certUrl: string,
  ): Promise<string> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).addCertificate(
      checkSum,
      recipientName,
      recipientSurname,
      parseInt(daysValid),
      certUrl,
    );
  }

  /**
        Function used to remove trusted issuer. Only trusted issuers can perform this action.

        issuerAddress: string - wallet address of new trusted issuer.

        returns: Promise object of string type
    */
  public async removeTrustedIssuer(issuerAddress: string): Promise<string> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).removeTrustedIssuer(issuerAddress);
  }

  private getContract(signer: ethers.ContractRunner) {
    return new ethers.Contract(
      this.contractAddress,
      contractABI,
      this.provider,
    ).connect(signer) as CertificateRepository;
  }
}
