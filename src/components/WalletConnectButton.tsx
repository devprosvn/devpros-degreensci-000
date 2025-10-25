import { ConnectButton } from "@mysten/dapp-kit";

export const WalletConnectButton = () => {
  return (
    <ConnectButton
      connectText="Connect Wallet"
      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium transition-opacity"
    />
  );
};
