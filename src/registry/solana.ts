import { BaseRegistry } from './base';
import {
  DIDDocument,
  VerificationMethod,
  AuthenticationMethod,
  AssertionMethod,
  KeyAgreementMethod,
} from './types';

import {
  SolanaVerifiableRegistryType,
  SolanaVerifiableRegistry,
} from '../constants/idl';
import SOLKey from '../constants/solana.key.json';

import {
  AnchorProvider,
  web3,
  Idl,
  Program,
  Wallet,
} from '@project-serum/anchor';
import { SOLANA_DID_PREFIX } from '..';
import { BN, utils } from '@coral-xyz/anchor';

export class SolanaRegistry implements BaseRegistry {
  public programId: web3.PublicKey;
  private program: Program<SolanaVerifiableRegistryType>;
  constructor(programId: string, provider: AnchorProvider) {
    this.programId = new web3.PublicKey(programId);
    const program = new Program<SolanaVerifiableRegistryType>(
      SolanaVerifiableRegistry as SolanaVerifiableRegistryType,
      new web3.PublicKey(programId),
      provider
    );
    this.program = program;
  }

  async getContextDID(did: string): Promise<DIDDocument> {
    const account = await this.program.account.did.fetch(did);
    return {
      ...account,
      id: did,
    };
  }

  async createDID(
    id: string,
    controller: string,
    pdaDid: string,
    pdaDidList: string,
    verificationMethod: VerificationMethod | any,
    authenticationMethod: AuthenticationMethod,
    assertionMethod: AssertionMethod,
    keyAgreementMethod: KeyAgreementMethod
  ): Promise<string> {
    const alsoKnowAs: string[] = [];
    const create = await this.program.methods
      .createDid(
        id,
        controller,
        alsoKnowAs,
        verificationMethod,
        authenticationMethod,
        assertionMethod,
        keyAgreementMethod
      )
      .accounts({
        creator: this.program.provider.publicKey,
        didDetail: new web3.PublicKey(pdaDid),
        didList: new web3.PublicKey(pdaDidList),
      })
      .rpc();
    return create;
  }
}

void (async () => {
  const wallet = new Wallet(web3.Keypair.fromSecretKey(new Uint8Array(SOLKey)));
  console.log('🚀 ~ file: solana.ts:77 ~ void ~ wallet:', wallet.publicKey);
  const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
  const provider = new AnchorProvider(connection, wallet, {
    commitment: 'finalized',
  });
  const programId = new web3.PublicKey(
    'E5zT3q81FxiKDwmocEUEjPshNsNBJnMZHPyqCeG5FirG'
  );
  const registry = new SolanaRegistry(programId.toString(), provider);
  // const did = await registry.getContextDID(
  //   '66XtzALc8Vs1smYBzDGg32NhTyc8XxM825scbrmzuquf'
  // );
  // console.log('🚀 ~ file: solana.ts:49 ~ did:', did);

  const id = `${SOLANA_DID_PREFIX.devnet}:family`;
  const controller = `${SOLANA_DID_PREFIX.devnet}:family`;
  const [pdaDid] = web3.PublicKey.findProgramAddressSync(
    [utils.bytes.utf8.encode('did'), utils.bytes.utf8.encode(id)],
    registry.programId
  );
  console.log('🚀 ~ file: solana.ts:96 ~ void ~ pdaDid:', pdaDid);
  const [pdaDidList] = web3.PublicKey.findProgramAddressSync(
    [utils.bytes.utf8.encode('list'), wallet.publicKey.toBytes()],
    registry.programId
  );
  const wallet1 = web3.Keypair.generate();
  const key1 = `${id}#${wallet1.publicKey.toBase58()}`;

  const verificationMethod: VerificationMethod = {
    id: key1,
    created: new BN(Date.now()) as number,
    rType: { ed25519VerificationKey2018: 1 } as any,
    publicKey: wallet1.publicKey.toBase58(),
    publicKeyBase58: wallet1.publicKey.toBase58(),
  } as VerificationMethod;
  const authenticationMethod: string[] = [key1];
  const assertionMethod: string[] = [key1];
  const keyAgreementMethod: string[] = [key1];
  const initDid = await registry.createDID(
    id,
    controller,
    pdaDid.toString(),
    pdaDidList.toString(),
    verificationMethod,
    authenticationMethod,
    assertionMethod,
    keyAgreementMethod
  );
  console.log('🚀 ~ file: solana.ts:111 ~ initDid:', initDid);

  const did = await registry.getContextDID(pdaDid.toBase58());
  console.log('🚀 ~ file: solana.ts:49 ~ did:', did.verificationMethod);
})();
