import { useState } from "react";
import { useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { CONTRACT_CONFIG, CONTRACT_FUNCTIONS } from "@/config/contract";

interface VerifyMintButtonProps {
  walrusCid: string;
  metadata: string;
  onMintSuccess: () => void;
}

export const VerifyMintButton = ({
  walrusCid,
  metadata,
  onMintSuccess,
}: VerifyMintButtonProps) => {
  const [minting, setMinting] = useState(false);
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const account = useCurrentAccount();

  const handleMint = async () => {
    if (!account) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!walrusCid || !metadata) {
      toast.error("Missing CID or metadata");
      return;
    }

    if (!CONTRACT_CONFIG.registryId) {
      toast.error("NFT Registry not configured. Please set VITE_NFT_REGISTRY in .env");
      return;
    }

    setMinting(true);
    try {
      const tx = new Transaction();

      tx.moveCall({
        target: `${CONTRACT_CONFIG.packageId}::${CONTRACT_CONFIG.moduleName}::${CONTRACT_FUNCTIONS.MINT_DATA_NFT}`,
        arguments: [
          tx.object(CONTRACT_CONFIG.registryId),
          tx.pure.string(walrusCid),
          tx.pure.string(metadata),
        ],
      });

      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            console.log("Mint successful:", result);
            toast.success("Data NFT minted successfully!");
            onMintSuccess();
          },
          onError: (error) => {
            console.error("Mint error:", error);
            toast.error("Failed to mint NFT: " + error.message);
          },
        }
      );
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("Failed to create transaction");
    } finally {
      setMinting(false);
    }
  };

  if (!walrusCid) {
    return null;
  }

  return (
    <Card className="p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-hover)]">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-8 w-8 text-accent" />
          <div>
            <h3 className="text-xl font-bold text-foreground">Ready to Mint</h3>
            <p className="text-sm text-muted-foreground">
              Your data is verified and ready to be minted as an NFT
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Walrus Content ID</p>
          <p className="break-all font-mono text-xs text-foreground">{walrusCid}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            This content ID will be permanently stored on-chain
          </p>
        </div>
        
        <div className="rounded-lg bg-muted p-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Metadata Preview</p>
          <p className="text-xs text-foreground line-clamp-3">{metadata}</p>
        </div>

        <Button
          onClick={handleMint}
          disabled={minting || !account}
          className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90"
          size="lg"
        >
          {minting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Minting on Sui...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Verify & Mint Data NFT on Sui
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
