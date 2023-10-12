import { BaseRegistry } from './base';
import { DIDDocument } from './types';

import IDL from './../constants/idl/solana.json';

import { AnchorProvider, Idl, Program } from '@project-serum/anchor';

export class SolanaRegistry implements BaseRegistry {
  private program: Program;
  constructor(programId: string, provider: AnchorProvider) {
    const program = new Program(IDL as Idl, programId, provider);
    this.program = program;
  }

  async getContextDID(did: string): Promise<DIDDocument> {
    const account = await this.program.account.did.fetch(did);
    return {
      id: did,
      ...account,
    };
  }
}
