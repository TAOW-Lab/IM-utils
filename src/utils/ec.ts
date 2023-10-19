import { ec as EC, eddsa } from 'elliptic';

import { MULTIBASE_PREFIX, VERIFICATION_METHOD } from '../constants';
import { utils } from '@coral-xyz/anchor';

export const keyFromPublicKey = (
  publicKey: Buffer,
  keyType: string
): EC.KeyPair | eddsa.KeyPair => {
  switch (keyType.toLowerCase()) {
    case VERIFICATION_METHOD.secp256k1.toLowerCase(): {
      const ec = new EC('secp256k1');
      const uncompressedKey = [4, ...publicKey];
      return ec.keyFromPublic(uncompressedKey);
    }
    case VERIFICATION_METHOD.ed25519.toLowerCase(): {
      const ec = new eddsa('ed25519');
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
  if (!MULTIBASE_PREFIX[type]) {
    throw new Error('Unsupported prefix');
  }
  const value = MULTIBASE_PREFIX[type] + data;
  return value;
};
