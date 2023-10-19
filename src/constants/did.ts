export const VERIFICATION_METHOD = {
  secp256k1: 'EcdsaSecp256k1VerificationKey2019',
  ed25519: 'Ed25519VerificationKey2018',
};

export type VERIFICATION_METHOD_TYPE =
  | 'Ed25519VerificationKey2018'
  | 'EcdsaSecp256k1VerificationKey2019';

export const MULTIBASE_PREFIX = {
  base58btc: 'z',
  base64: 'm',
  base64url: 'u',
  hex: 'f',
};

export const SOLANA_DID_PREFIX = {
  devnet: 'did:solana:devnet',
  mainnet: 'did:solana:mainnet',
};
