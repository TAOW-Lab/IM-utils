import {
  Ed25519VerificationKey2018,
  Ed25519Signature2018,
} from '@transmute/ed25519-signature-2018';
import { verifiable } from '@transmute/vc.js';
import { DocumentLoader } from '@transmute/vc.js/dist/types/DocumentLoader';

import { customDocumentLoader, resolveContext, resolveDID } from './../utils';
import { KeyPairRaw, Resolver, VCData, VCResult, VerifyResult } from './types';
import { BaseMethod } from './base';
import { utils, web3 } from '@coral-xyz/anchor';

export class Ed25519 implements BaseMethod {
  private suite: Ed25519Signature2018 = new Ed25519Signature2018();
  private documentLoader: DocumentLoader;
  constructor(resolver?: Resolver) {
    this.documentLoader = uri => {
      return customDocumentLoader(uri, resolver);
    };
  }

  public async init(key?: KeyPairRaw): Promise<void> {
    if (typeof key !== 'undefined') {
      const keyPair = await Ed25519VerificationKey2018.from(key);
      const suite = new Ed25519Signature2018({ key: keyPair });
      this.suite = suite;
    }
  }

  async createVc(credential: VCData): Promise<VCResult> {
    const vc = await verifiable.credential.create({
      credential,
      documentLoader: this.documentLoader,
      suite: this.suite,
      format: ['vc'],
    });
    return vc;
  }

  async verifyVc(credential: VCData): Promise<VerifyResult> {
    const result = await verifiable.credential.verify({
      credential,
      documentLoader: this.documentLoader,
      suite: this.suite,
    });
    return result;
  }
}

void (async () => {
  const issuer = 'did:solana:issuer';
  const key1 = issuer + '#key-1';
  const raw = web3.Keypair.generate();
  const keyPair = {
    id: key1,
    type: 'Ed25519VerificationKey2018',
    controller: issuer,
    publicKeyBase58: raw.publicKey.toBase58(),
    privateKeyBase58: utils.bytes.bs58.encode(raw.secretKey),
  } as KeyPairRaw;
  const ed25519 = new Ed25519({
    resolveContext: resolveContext,
    resolveDID: did => {
      console.log('🚀 ~ file: ed25519.ts:64 ~ did:', did);
      return resolveDID(did);
    },
  });
  await ed25519.init(keyPair);

  const vcData = {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      {
        AlumniCredential: 'https://schema.org#AlumniCredential',
        alumniOf: 'https://schema.org#alumniOf',
      },
    ],
    id: 'http://example.edu/credentials/1872',
    type: ['VerifiableCredential', 'AlumniCredential'],
    issuer: issuer,
    issuanceDate: '2019-12-03T12:19:52Z',
    expirationDate: '2020-12-03T12:19:52Z',
    credentialSubject: {
      id: 'did:example:holder',
      alumniOf: 'Example University',
    },
  };
  const vcResult = await ed25519.createVc(vcData);
  const verify = await ed25519.verifyVc(vcResult.items[0]);
  console.log('🚀 ~ file: ed25519.ts:78 ~ verify:', verify);
})();
