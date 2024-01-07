/*
    Contract abi is being generated after deployment of contract to blockchain network.
    When using remix solidity IDE, example path can look like this: ex. contracts/artifacts/CertificateRegistry.json
    Search for 'abi' and copy whole array object.
*/
export const contractABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address'
      }
    ],
    name: 'addAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_checksum',
        type: 'string'
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'surname',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'email',
            type: 'string'
          }
        ],
        internalType: 'struct CertificateRegistry.Recipient',
        name: '_recipient',
        type: 'tuple'
      },
      {
        internalType: 'uint256',
        name: '_days_valid',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: '_cert_name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_issuer_identification_name',
        type: 'string'
      }
    ],
    name: 'addCertificate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_issuer',
        type: 'address'
      }
    ],
    name: 'addTrustedIssuer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'checksum',
            type: 'string'
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'surname',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'email',
                type: 'string'
              }
            ],
            internalType: 'struct CertificateRegistry.Recipient',
            name: 'recipient',
            type: 'tuple'
          },
          {
            internalType: 'uint256',
            name: 'days_valid',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'cert_name',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'issuer_identification_name',
            type: 'string'
          }
        ],
        internalType: 'struct CertificateRegistry.BulkCertificateData[]',
        name: '_bulkData',
        type: 'tuple[]'
      }
    ],
    name: 'bulkUploadCertificates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address'
      }
    ],
    name: 'removeAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'string',
        name: 'index',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'checksum',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'reason',
        type: 'string'
      }
    ],
    name: 'FailedAddingCertificate',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_checksum',
        type: 'string'
      }
    ],
    name: 'invalidate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_issuer',
        type: 'address'
      }
    ],
    name: 'removeTrustedIssuer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'string',
        name: 'index',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'checksum',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'recipient_name',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'recipient_surname',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'recipient_email',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'issuer_identification_name',
        type: 'string'
      }
    ],
    name: 'SuccessfullyAddedCertificate',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'admins',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAllCertificates',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'checksum',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'issueDate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'expireDate',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'issuer',
            type: 'address'
          },
          {
            internalType: 'string',
            name: 'certName',
            type: 'string'
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'surname',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'email',
                type: 'string'
              }
            ],
            internalType: 'struct CertificateRegistry.Recipient',
            name: 'recipient',
            type: 'tuple'
          },
          {
            internalType: 'string',
            name: 'issuer_identification_name',
            type: 'string'
          }
        ],
        internalType: 'struct CertificateRegistry.Certificate[]',
        name: 'issued',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_checksum',
        type: 'string'
      }
    ],
    name: 'getCertificate',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'checksum',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'issueDate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'expireDate',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'issuer',
            type: 'address'
          },
          {
            internalType: 'string',
            name: 'certName',
            type: 'string'
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'surname',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'email',
                type: 'string'
              }
            ],
            internalType: 'struct CertificateRegistry.Recipient',
            name: 'recipient',
            type: 'tuple'
          },
          {
            internalType: 'string',
            name: 'issuer_identification_name',
            type: 'string'
          }
        ],
        internalType: 'struct CertificateRegistry.Certificate',
        name: 'result',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_issuer',
        type: 'address'
      }
    ],
    name: 'getCertificatesIssuedBy',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'checksum',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'issueDate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'expireDate',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'issuer',
            type: 'address'
          },
          {
            internalType: 'string',
            name: 'certName',
            type: 'string'
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'surname',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'email',
                type: 'string'
              }
            ],
            internalType: 'struct CertificateRegistry.Recipient',
            name: 'recipient',
            type: 'tuple'
          },
          {
            internalType: 'string',
            name: 'issuer_identification_name',
            type: 'string'
          }
        ],
        internalType: 'struct CertificateRegistry.Certificate[]',
        name: 'issued',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getChecksums',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address'
      }
    ],
    name: 'isAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'isContractOwner',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_issuer',
        type: 'address'
      }
    ],
    name: 'isTrustedIssuer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'trustedIssuers',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];
