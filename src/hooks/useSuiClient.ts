import { useSuiClient as useClient } from "@mysten/dapp-kit";

export const useSuiClient = () => {
  const client = useClient();
  
  return client;
};
