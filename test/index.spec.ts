import { web3, utils } from '@coral-xyz/anchor';
import { Ed25519, KeyPairRaw } from './../src';

describe('Method', () => {
  const issuer = 'did:solana:123';
  const key1 = issuer + '#key-1';
  describe('Ed25519', () => {
    // Test by key solana
    const raw = web3.Keypair.generate();
    console.log('🚀 ~ file: index.spec.ts:10 ~ describe ~ raw:', raw);
    const keyPair = {
      id: key1,
      type: 'Ed25519VerificationKey2018',
      controller: issuer,
      publicKeyBase58: raw.publicKey.toBase58(),
      privateKeyBase58: utils.bytes.bs58.encode(raw.secretKey),
    } as KeyPairRaw;
    // const ed25519 = new Ed25519(keyPair);
    // console.log('🚀 ~ file: index.spec.ts:17 ~ describe ~ ed25519:', ed25519);
    // it('should return verifiable credential', () => {});
  });
});
