import { BaseRegistry } from './base';
import { DIDDocument } from './types';

import IDL from './../constants/idl/solana.json';

import {
  AnchorProvider,
  web3,
  Idl,
  Program,
  Wallet,
} from '@project-serum/anchor';

export class SolanaRegistry implements BaseRegistry {
  private program: Program;
  constructor(programId: string, provider: AnchorProvider) {
    const program = new Program(
      IDL as Idl,
      new web3.PublicKey(programId),
      provider
    );
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

const wallet = new Wallet(web3.Keypair.generate());
const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
const provider = new AnchorProvider(connection, wallet, {});
const test = new SolanaRegistry(wallet.publicKey.toString(), provider);
console.log('🚀 ~ file: solana.ts:34 ~ test:', test);
