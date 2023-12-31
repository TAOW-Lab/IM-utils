import {
  CreateCredentialResult,
  VerificationResult,
} from '@transmute/vc.js/dist/types';
import { VerifiableCredential } from '@transmute/vc.js/dist/types/VerifiableCredential';
import { VERIFICATION_METHOD_TYPE } from './../constants';
import { DocumentContext } from './../common';

export type Resolver = {
  resolveDID: (did: string) => DocumentContext;
  resolveContext: (url: string) => Promise<DocumentContext>;
};

export type KeyPairRaw = {
  id: string;
  type: VERIFICATION_METHOD_TYPE;
  controller: string;
  privateKeyBase58: string;
  publicKeyBase58: string;
};

export type VCData = VerifiableCredential;
export type VCResult = CreateCredentialResult;
export type VerifyResult = VerificationResult;
