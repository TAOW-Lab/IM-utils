import { VERIFICATION_METHOD_TYPE } from '../constants';

export type DIDDocument = {
  id: string;
  [key: string]: string | Record<string, string>;
};

export type VerificationMethod = {
  id: string;
  created: number;
  vType: { [keyof in VERIFICATION_METHOD_TYPE]: unknown };
  publicKey: string;
  publicKeyBase58: string;
};

export type AuthenticationMethod = VerificationMethod[] | string[];
export type AssertionMethod = VerificationMethod[] | string[];
export type KeyAgreementMethod = VerificationMethod[] | string[];
