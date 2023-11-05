
import { ethers } from "ethers";
import { CertificateRepository } from "./CertificateRepository";
import { contractABI } from "./ContractAbi";


export class SepoliaService {

    private readonly provider: ethers.JsonRpcProvider;
    private readonly wallet: ethers.Wallet;
    private contractAddress: string;

    constructor(contractAddress: string, privateWalletKey: string) {
        //Sepolia Testnet RPC URL
        const sepoliaTestnetRPC = "https://rpc.sepolia.org/";

        this.provider = new ethers.JsonRpcProvider(sepoliaTestnetRPC);
        this.wallet = new ethers.Wallet(privateWalletKey, this.provider);
        this.contractAddress = contractAddress;
    }

    /**
        Function used to add certificate to blockchain.

        checkSum: string - generated checkSum value for deployed certificate file.

        returns: Promise object of string type
    */
    public async getCertificate(checkSum: string): Promise<string> {
        return await this.getContract().getCertificate(checkSum);
    };

    /**
        Function used to add new trusted issuer. Only trusted issuers can perform this action.

        issuerAddress: string - wallet address of new trusted issuer.

        returns: Promise object of string type
    */
    public async addTrustedIssuer(issuerAddress: string): Promise<string> {
        return await this.getContract().addTrustedIssuer(issuerAddress);
    }

    /**
        Function used to add new certificate. Only trusted issuers can perform this action.

        checkSum: string - generated checkSum value for certificate file that will be deployed.
        recipientName: string - name of certificate owner.
        recipientSurname: string - surname of certificate owner.

        returns: Promise object of string type
    */
    public async addCertificate(checkSum: string, recipientName: string, recipientSurname: string): Promise<string> {
        return await this.getContract().addCertificate(checkSum, recipientName, recipientSurname);
    }

    /**
        Function used to remove trusted issuer. Only trusted issuers can perform this action.

        issuerAddress: string - wallet address of new trusted issuer.

        returns: Promise object of string type
    */
    public async removeTrustedIssuer(issuerAddress: string): Promise<string> {
        return await this.getContract().removeTrustedIssuer(issuerAddress);
    }

    public async getBalance(address: string): Promise<string> {
        try {
            const balance = await this.provider.getBalance(address);
            return ethers.formatEther(balance);
        } catch (error) {
            console.error("Error fetching balance: ", error);
            return "0";
        }
    }

    private getContract() {
        return new ethers.Contract(this.contractAddress, contractABI, this.provider).connect(this.wallet) as CertificateRepository;
    }
}