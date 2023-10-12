import { VCData, VCResult, VerifyResult } from './types';

export interface BaseMethod {
  createVc(credential: VCData): Promise<VCResult>;
  verifyVc(credential: VCData): Promise<VerifyResult>;
}
