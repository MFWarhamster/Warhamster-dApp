import { Connection, PublicKey } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';

const connection = new Connection('https://api.mainnet-beta.solana.com');

export async function fetchNFTs(walletAddress: string) {
  const mx = Metaplex.make(connection);
  const ownerPublicKey = new PublicKey(walletAddress);

  const nfts = await mx.nfts().findAllByOwner({ owner: ownerPublicKey });

  return nfts;
}
