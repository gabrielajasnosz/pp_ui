
import { ethers } from "ethers";
import {eth} from "web3";
import {CertificateRepository} from "./CertificateRepository";

// Sepolia Testnet RPC URL
const sepoliaTestnetRPC = "https://rpc.sepolia.org/";

// Create a provider
const provider = new ethers.JsonRpcProvider(sepoliaTestnetRPC);

// An example function to fetch the balance of an Ethereum address
export async function getBalance(address: string): Promise<string> {
    try {
        const balance = await provider.getBalance(address);
        return ethers.formatEther(balance);
    } catch (error) {
        console.error("Error fetching balance: ", error);
        return "0";
    }
}

const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_checksum",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_recipient_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_recipient_surname",
                "type": "string"
            }
        ],
        "name": "addCertificate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_issuer",
                "type": "address"
            }
        ],
        "name": "addTrustedIssuer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_checksum",
                "type": "string"
            }
        ],
        "name": "getCertificate",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "checksum",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "issueDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expireDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "issuer",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "surname",
                                "type": "string"
                            }
                        ],
                        "internalType": "struct CertificateRegistry.Recipient",
                        "name": "recipient",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct CertificateRegistry.Certificate",
                "name": "result",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_issuer",
                "type": "address"
            }
        ],
        "name": "removeTrustedIssuer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "trustedIssuers",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

// TODO: In place of XXX insert private key of wallet that you connect to Sepolia test net
const wallet = new ethers.Wallet('XXX' , provider);

export async function getCertificate() {
    try {
        const contractAddress = "0xAE13be4d486926633132Ea8f11E75e581B128E23"
        const contract: CertificateRepository = new ethers.Contract(contractAddress, contractABI, provider).connect(wallet) as CertificateRepository;


        // Read data from the contract
        const value = await contract.getCertificate("certyfikat")
            .then(result => console.log("Current value:", result.toString()))
            .catch(error => console.log(error));


        // Send a transaction to update the value (example with a write function)
/*        const signer = provider.getSigner();
        const newValue = 100; // Example value to update
        const tx = await contract.connect(signer).updateValue(newValue);
        await tx.wait();
        console.log("Value updated!");*/
    } catch (error) {
        console.error("Error interacting with the contract:", error);
    }
};
