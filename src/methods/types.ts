import {
  CreateCredentialResult,
  VerificationResult,
} from '@transmute/vc.js/dist/types';
import { VerifiableCredential } from '@transmute/vc.js/dist/types/VerifiableCredential';

export type KeyPairRaw = {
  id: string;
  type: string;
  controller: string;
  privateKeyBase58: string;
  publicKeyBase58: string;
};

export type VCData = VerifiableCredential;
export type VCResult = CreateCredentialResult;
export type VerifyResult = VerificationResult;
