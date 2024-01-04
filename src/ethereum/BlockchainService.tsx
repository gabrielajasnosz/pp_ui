import { ethers, Listener } from 'ethers';
import { Cert, CertificateRepository } from './CertificateRepository'
import { contractABI } from './ContractAbi';

export const CONTRACT_ADDRESS = '0x6F8207Afb588D4E54eC43Df089c60380b59d8A5A';

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
    const provider = new ethers.JsonRpcProvider();
    const contract = await new ethers.Contract(
      CONTRACT_ADDRESS,
      contractABI,
      provider,
    );
    return await contract.getCertificate(checkSum);
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

  public async addAdmin(adminAddress: string): Promise<string> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).addAdmin(adminAddress);
  }

  public async removeAdmin(adminAddress: string): Promise<string> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).removeAdmin(adminAddress);
  }

  public async isAdmin(): Promise<string> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).isAdmin(signer.address);
  }

  public async isContractOwner(): Promise<string> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).isContractOwner(signer.address);
  }

  /**
        Function used to add new certificate. Only trusted issuers can perform this action.

        checkSum: string - generated checkSum value for certificate file that will be deployed.
        recipientName: string - name of certificate owner.
        recipientSurname: string - surname of certificate owner.
        recipientEmail: string - email of certificate owner.

        returns: Promise object of string type
    */
  public async addCertificate(
    checkSum: string,
    recipientName: string,
    recipientSurname: string,
    recipientEmail: string,
    daysValid: string,
    certName: string,
    issuer: string,
  ): Promise<string> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).addCertificate(
      checkSum,
      { name: recipientName, surname: recipientName, email: recipientEmail},
      parseInt(daysValid),
      certName,
      issuer,
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

  public async invalidateCertificate(checkSum: string): Promise<string> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).invalidate(checkSum);
  }

  public async getCertificatesIssuedBy(issuer: string): Promise<string[]> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).getCertificatesIssuedBy(issuer);
  }

  private getContract(signer: ethers.ContractRunner) {
    return new ethers.Contract(
      this.contractAddress,
      contractABI,
      this.provider,
    ).connect(signer) as CertificateRepository;
  }

  /**
        Function used to add new certificates in bulk. Only trusted issuers can perform this action.

        returns: Promise object of string type
    */
  public async bulkUploadCertificates(certData: Cert[]): Promise<string> {
    const signer = await this.provider.getSigner();

    return await this.getContract(signer).bulkUploadCertificates(certData);
  }

  public async subscribeToEvent(event: string, listener: Listener) {
    const signer = await this.provider.getSigner();
    await this.getContract(signer).on(event, listener);
  }

  public async removeListeners() {
    await this.provider.removeAllListeners()
  }
}
