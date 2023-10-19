import { BN } from '@coral-xyz/anchor';
import { VERIFICATION_METHOD_TYPE } from '../constants';

export type DIDDocument = {
  id: string;
  [key: string]: string | string[] | boolean | Record<string, string> | unknown;
};

export type VerificationMethod = {
  id: string;
  created: number | BN;
  rType: { [keyof in VERIFICATION_METHOD_TYPE]: unknown } | any;
  type?: VERIFICATION_METHOD_TYPE;
  publicKeyMultibase: string;
  publicKey?: string;
  publicKeyBase58?: string;
};

export type AuthenticationMethod = string[];
export type AssertionMethod = string[];
export type KeyAgreementMethod = string[];
