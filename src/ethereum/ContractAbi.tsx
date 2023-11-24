/*
    Contract abi is being generated after deployment of contract to blockchain network. 
    When using remix solidity IDE, example path can look like this: ex. contracts/artifacts/CertificateRegistry.json
    Search for "abi" and copy whole array object.
*/
export const contractABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'trustedIssuers',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_checksum',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_recipient_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_recipient_surname',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_days_valid',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_cert_url',
        type: 'string',
      },
    ],
    name: 'addCertificate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_issuer',
        type: 'address',
      },
    ],
    name: 'addTrustedIssuer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_issuer',
        type: 'address',
      },
    ],
    name: 'removeTrustedIssuer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_issuer',
        type: 'address',
      },
    ],
    name: 'isTrustedIssuer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_checksum',
        type: 'string',
      },
    ],
    name: 'getCertificate',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'checksum',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'issueDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expireDate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'certUrl',
            type: 'string',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'surname',
                type: 'string',
              },
            ],
            internalType: 'struct CertificateRegistry.Recipient',
            name: 'recipient',
            type: 'tuple',
          },
        ],
        internalType: 'struct CertificateRegistry.Certificate',
        name: 'result',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_checksum',
        type: 'string',
      },
    ],
    name: 'invalidate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
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
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'issueDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expireDate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'certUrl',
            type: 'string',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'surname',
                type: 'string',
              },
            ],
            internalType: 'struct CertificateRegistry.Recipient',
            name: 'recipient',
            type: 'tuple',
          },
        ],
        internalType: 'struct CertificateRegistry.Certificate[]',
        name: 'issued',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_issuer',
        type: 'address',
      },
    ],
    name: 'getCertificatesIssuedBy',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'checksum',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'issueDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expireDate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'certUrl',
            type: 'string',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'surname',
                type: 'string',
              },
            ],
            internalType: 'struct CertificateRegistry.Recipient',
            name: 'recipient',
            type: 'tuple',
          },
        ],
        internalType: 'struct CertificateRegistry.Certificate[]',
        name: 'issued',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getChecksums',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
