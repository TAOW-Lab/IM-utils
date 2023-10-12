import {
  Ed25519VerificationKey2018,
  Ed25519Signature2018,
} from '@transmute/ed25519-signature-2018';
import { verifiable } from '@transmute/vc.js';
import {
  CreateCredentialResult,
  VerificationResult,
} from '@transmute/vc.js/dist/types';
import { VerifiableCredential } from '@transmute/vc.js/dist/types/VerifiableCredential';

import { customDocumentLoader } from './../utils';

export type KeyPairRaw = {
  id: string;
  type: string;
  controller: string;
  privateKeyBase58: string;
  publicKeyBase58: string;
};

export class Ed25519 {
  private suite: Ed25519Signature2018[] = [];
  constructor(key?: KeyPairRaw) {
    void this.init(key);
  }

  private async init(key?: KeyPairRaw): Promise<void> {
    if (typeof key !== 'undefined') {
      const keyPair = await Ed25519VerificationKey2018.from(key);
      const suite = new Ed25519Signature2018({ key: keyPair });
      this.suite = this.suite.concat(suite);
    } else {
      const suite = new Ed25519Signature2018();
      this.suite = this.suite.concat(suite);
    }
    return;
  }

  async createVc(
    credential: VerifiableCredential
  ): Promise<CreateCredentialResult> {
    const vc = await verifiable.credential.create({
      credential,
      documentLoader: customDocumentLoader,
      suite: this.suite,
      format: ['vc'],
    });
    return vc;
  }

  async verifyVc(
    credential: VerifiableCredential
  ): Promise<VerificationResult> {
    const result = await verifiable.credential.verify({
      credential,
      documentLoader: customDocumentLoader,
      suite: this.suite,
    });
    return result;
  }
}
