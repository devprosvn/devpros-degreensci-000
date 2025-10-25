/**
 * Type definitions for Sui blockchain interactions
 */

export interface DataNFT {
  id: string;
  walrus_cid: string;
  metadata: string;
  owner: string;
  royalty: number;
  created_at: number;
  accumulated_royalty: number;
}

export interface NFTRegistry {
  id: string;
  total_minted: number;
}

export interface DataNFTMintedEvent {
  nft_id: string;
  owner: string;
  walrus_cid: string;
  metadata: string;
  royalty: number;
  mint_timestamp: number;
}

export interface RoyaltyClaimedEvent {
  owner: string;
  amount: number;
  nft_id: string;
  claim_timestamp: number;
}

export interface WalrusUploadResponse {
  newlyCreated?: {
    blobObject: {
      blobId: string;
      storage: {
        id: string;
        startEpoch: number;
        endEpoch: number;
        storageSize: number;
      };
    };
    encodedSize: number;
    cost: number;
  };
  alreadyCertified?: {
    blobId: string;
    endEpoch: number;
  };
}

export interface TransactionResult {
  success: boolean;
  digest?: string;
  effects?: any;
  error?: string;
}
