import { DIDDocument } from './types';

export interface BaseRegistry {
  getContextDID(did: string): Promise<DIDDocument>;
}
