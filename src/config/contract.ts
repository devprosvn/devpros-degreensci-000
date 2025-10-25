import { PACKAGE_ID, MODULE_NAME, NFT_REGISTRY } from "./env";

export const CONTRACT_CONFIG = {
  packageId: PACKAGE_ID,
  moduleName: MODULE_NAME,
  registryId: NFT_REGISTRY,
};

// Contract function names
export const CONTRACT_FUNCTIONS = {
  MINT_DATA_NFT: "mint_data_nft",
  GET_OWNER_NFTS: "get_owner_nfts",
  CLAIM_ROYALTY: "claim_royalty",
  ADD_ROYALTY: "add_royalty",
  TOTAL_MINTED: "total_minted",
  CID_EXISTS: "cid_exists",
  TRANSFER_NFT: "transfer_nft",
};

// Event types
export const EVENT_TYPES = {
  DATA_NFT_MINTED: `${PACKAGE_ID}::${MODULE_NAME}::DataNFTMinted`,
  ROYALTY_CLAIMED: `${PACKAGE_ID}::${MODULE_NAME}::RoyaltyClaimed`,
};
