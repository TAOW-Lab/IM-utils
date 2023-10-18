export const SolanaVerifiableRegistry = {
  version: '0.1.0',
  name: 'im_smartcontract',
  instructions: [
    {
      name: 'createDid',
      accounts: [
        {
          name: 'didDetail',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'didList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'creator',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'didId',
          type: 'string',
        },
        {
          name: 'controller',
          type: 'string',
        },
        {
          name: 'alsoKnowAs',
          type: {
            vec: 'string',
          },
        },
        {
          name: 'verificationMethod',
          type: {
            defined: 'VerificationMethod',
          },
        },
        {
          name: 'authenticationMethod',
          type: {
            vec: 'string',
          },
        },
        {
          name: 'assertionMethod',
          type: {
            vec: 'string',
          },
        },
        {
          name: 'keysAgreement',
          type: {
            vec: 'string',
          },
        },
      ],
    },
    {
      name: 'updateAssertion',
      accounts: [
        {
          name: 'didDetail',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'creator',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'didId',
          type: 'string',
        },
        {
          name: 'key',
          type: 'string',
        },
        {
          name: 'action',
          type: {
            defined: 'UpdateAction',
          },
        },
      ],
    },
    {
      name: 'updateAuthentication',
      accounts: [
        {
          name: 'didDetail',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'creator',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'didId',
          type: 'string',
        },
        {
          name: 'key',
          type: 'string',
        },
        {
          name: 'action',
          type: {
            defined: 'UpdateAction',
          },
        },
      ],
    },
    {
      name: 'updateKeyAgreement',
      accounts: [
        {
          name: 'didDetail',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'creator',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'didId',
          type: 'string',
        },
        {
          name: 'key',
          type: 'string',
        },
        {
          name: 'action',
          type: {
            defined: 'UpdateAction',
          },
        },
      ],
    },
    {
      name: 'updateVerification',
      accounts: [
        {
          name: 'didDetail',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'creator',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'didId',
          type: 'string',
        },
        {
          name: 'key',
          type: {
            defined: 'VerificationMethod',
          },
        },
        {
          name: 'action',
          type: {
            defined: 'UpdateAction',
          },
        },
      ],
    },
    {
      name: 'issueVc',
      accounts: [
        {
          name: 'didDetail',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vcDetail',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vcList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'holder',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'creator',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'didId',
          type: 'string',
        },
        {
          name: 'vcId',
          type: 'string',
        },
        {
          name: 'vcType',
          type: {
            vec: 'string',
          },
        },
        {
          name: 'issuanceDate',
          type: 'i64',
        },
        {
          name: 'expirationDate',
          type: 'i64',
        },
        {
          name: 'proof',
          type: {
            defined: 'Proof',
          },
        },
        {
          name: 'encryptedData',
          type: 'bytes',
        },
      ],
    },
    {
      name: 'revokeVc',
      accounts: [
        {
          name: 'didDetail',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vcDetail',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'holder',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'creator',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'didId',
          type: 'string',
        },
        {
          name: 'vcId',
          type: 'string',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'did',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'initialize',
            type: 'bool',
          },
          {
            name: 'id',
            type: 'string',
          },
          {
            name: 'controller',
            type: 'string',
          },
          {
            name: 'alsoKnowAs',
            type: {
              vec: 'string',
            },
          },
          {
            name: 'verificationMethod',
            type: {
              vec: {
                defined: 'VerificationMethod',
              },
            },
          },
          {
            name: 'authenticationMethod',
            type: {
              vec: 'string',
            },
          },
          {
            name: 'assertionMethod',
            type: {
              vec: 'string',
            },
          },
          {
            name: 'keysAgreement',
            type: {
              vec: 'string',
            },
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'listDid',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'didIds',
            type: {
              vec: 'string',
            },
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'vcList',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'vcIds',
            type: {
              vec: 'string',
            },
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'vc',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'initialize',
            type: 'bool',
          },
          {
            name: 'id',
            type: 'string',
          },
          {
            name: 'vcType',
            type: {
              vec: 'string',
            },
          },
          {
            name: 'issuer',
            type: 'publicKey',
          },
          {
            name: 'holder',
            type: 'publicKey',
          },
          {
            name: 'issuanceDate',
            type: 'i64',
          },
          {
            name: 'expirationDate',
            type: 'i64',
          },
          {
            name: 'status',
            type: {
              defined: 'VCStatus',
            },
          },
          {
            name: 'proof',
            type: {
              defined: 'Proof',
            },
          },
          {
            name: 'encryptedData',
            type: 'bytes',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'VerificationMethod',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'id',
            docs: ['id of key: id=controller + index-unique'],
            type: 'string',
          },
          {
            name: 'rType',
            type: {
              defined: 'VerificationType',
            },
          },
          {
            name: 'created',
            type: 'i64',
          },
          {
            name: 'publicKey',
            type: {
              option: 'string',
            },
          },
          {
            name: 'publicKeyBase58',
            type: {
              option: 'string',
            },
          },
        ],
      },
    },
    {
      name: 'Proof',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'rType',
            type: 'string',
          },
          {
            name: 'created',
            type: 'i64',
          },
          {
            name: 'verificationMethod',
            type: 'string',
          },
          {
            name: 'proofPurpose',
            type: 'string',
          },
          {
            name: 'proofValue',
            type: 'string',
          },
        ],
      },
    },
    {
      name: 'UpdateAction',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Add',
          },
          {
            name: 'Remove',
          },
        ],
      },
    },
    {
      name: 'VerificationType',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'EcdsaP256',
          },
          {
            name: 'EcdsaSecp256k1',
          },
          {
            name: 'BlsBls12_381',
          },
          {
            name: 'Ed25519VerificationKey2018',
          },
        ],
      },
    },
    {
      name: 'VCStatus',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Issued',
          },
          {
            name: 'Revoked',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'AlreadyInitialize',
      msg: 'DID account already initialize',
    },
    {
      code: 6001,
      name: 'HaveNotAlreadyInitializeYet',
      msg: 'DID account have not already initialize yet',
    },
    {
      code: 6002,
      name: 'InsertFailed',
      msg: 'Insert failed',
    },
    {
      code: 6003,
      name: 'TooLarge',
      msg: 'Data too large',
    },
    {
      code: 6004,
      name: 'EnumInValid',
      msg: 'Variant invalid',
    },
    {
      code: 6005,
      name: 'BumpError',
      msg: 'Unable to get  bump',
    },
  ],
};
