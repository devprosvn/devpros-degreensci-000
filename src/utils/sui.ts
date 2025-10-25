import { SuiClient } from "@mysten/sui/client";

/**
 * Format a Sui address for display (short version)
 */
export const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Format a timestamp from blockchain to readable date
 */
export const formatTimestamp = (timestamp: string | number): string => {
  const ts = typeof timestamp === "string" ? parseInt(timestamp) : timestamp;
  return new Date(ts * 1000).toLocaleDateString();
};

/**
 * Check if a wallet is connected
 */
export const isWalletConnected = (account: any): boolean => {
  return !!account?.address;
};

/**
 * Parse Move call result
 */
export const parseMoveCallResult = (result: any) => {
  try {
    return {
      success: result.effects?.status?.status === "success",
      digest: result.digest,
      effects: result.effects,
    };
  } catch (error) {
    console.error("Error parsing result:", error);
    return { success: false };
  }
};

/**
 * Get Walrus URL for a CID
 */
export const getWalrusUrl = (cid: string, aggregatorUrl: string): string => {
  return `${aggregatorUrl}/v1/${cid}`;
};

/**
 * Format royalty amount
 */
export const formatRoyalty = (amount: string | number): string => {
  const amt = typeof amount === "string" ? parseInt(amount) : amount;
  return amt.toLocaleString();
};
