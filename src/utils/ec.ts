import { ec as EC } from 'elliptic';

import { MULTIBASE_PREFIX, VERIFICATION_METHOD } from '../constants';
import { utils } from '@coral-xyz/anchor';

export const keyFromPublicKey = (
  publicKey: Buffer,
  keyType: string
): EC.KeyPair => {
  switch (keyType) {
    case VERIFICATION_METHOD.secp256k1: {
      const ec = new EC('secp256k1');
      const uncompressedKey = [4, ...publicKey];
      return ec.keyFromPublic(uncompressedKey);
    }
    case VERIFICATION_METHOD.ed25519: {
      const ec = new EC('ed25519');
      return ec.keyFromPublic(publicKey);
    }
    default: {
      throw new Error('Unsupported key type');
    }
  }
};

export const decodeMultiBase = (data: string): Buffer => {
  const identifier = data[0];
  const encodedData = data.slice(1);

  switch (identifier) {
    case MULTIBASE_PREFIX.base64: {
      return Buffer.from(encodedData, 'base64');
    }
    // case MULTIBASE_PREFIX.base64url: {
    //   return Buffer.from(encodedData, 'base64url');
    // }
    case MULTIBASE_PREFIX.base58btc: {
      return utils.bytes.bs58.decode(encodedData);
    }
    case MULTIBASE_PREFIX.hex: {
      return Buffer.from(encodedData, 'hex');
    }
    default: {
      throw new Error('Unsupported multibase prefix');
    }
  }
};

export const encodeMultiBase = (
  data: string,
  type: keyof typeof MULTIBASE_PREFIX
): string => {
  switch (type) {
    case MULTIBASE_PREFIX.base64: {
      return MULTIBASE_PREFIX.base64 + data;
    }
    // case MULTIBASE_PREFIX.base64url: {
    //   return Buffer.from(encodedData, 'base64url');
    // }
    case MULTIBASE_PREFIX.base58btc: {
      return MULTIBASE_PREFIX.base58btc + data;
    }
    case MULTIBASE_PREFIX.hex: {
      return MULTIBASE_PREFIX.hex + data;
    }
    default: {
      throw new Error('Unsupported multibase prefix');
    }
  }
};
