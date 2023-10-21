import { ec as EC, eddsa } from 'elliptic';

import { MULTIBASE_PREFIX, VERIFICATION_METHOD } from '../constants';
import { utils, web3 } from '@coral-xyz/anchor';

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
      return ec.keyFromPublic(publicKey.toString('hex'));
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
      return Buffer.from(encodedData);
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

// Test below

import SOLKey from '../constants/solana.key.json';

const wallet = web3.Keypair.fromSecretKey(
  Buffer.from(
    '45ada06f1971f0d73697cccb1b4adecc9955af9f643624391d7796d64662e032295b4330540804ca56328aebabd24a0cf8ef523b168813380646f1d1abdd9f71',
    'hex'
  )
);

const pubKeyBuffer = utils.bytes.bs58.decode(wallet.publicKey.toBase58());
const publicKey = new web3.PublicKey(pubKeyBuffer);
console.log('🚀 ~ file: ec.ts:72 ~ publicKey:', pubKeyBuffer.toString('hex'));

const ec = new eddsa('ed25519');
const keySign = ec.keyFromSecret(Buffer.from(wallet.secretKey.slice(0, 32)));
const msgHash =
  '123498d6557b407f4fd02f60fefbb53467add1a020f4ea617f7c292cacf8573911492687461ea9a0f61ed12d9601c1ff7c914cb257dbdd78f1f51c36345dfada';
const signature = keySign.sign(msgHash).toHex();
console.log('🚀 ~ file: ec.ts:84 ~ signature:', signature);

console.log('🚀 ~ file: ec.ts:76 ~ keySign:', keySign.getPublic('hex'));

const keyPub = ec.keyFromPublic(pubKeyBuffer.toString('hex'));
console.log('🚀 ~ file: ec.ts:81 ~ keyPub:', keyPub.getPublic('hex'));
const verified = keyPub.verify(msgHash, signature);
console.log('🚀 ~ file: ec.ts:91 ~ verified:', verified);
