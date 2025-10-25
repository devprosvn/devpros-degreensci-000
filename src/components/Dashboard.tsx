import { useEffect, useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FileText, Coins, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useSuiClient } from "@/hooks/useSuiClient";
import { CONTRACT_CONFIG } from "@/config/contract";
import { WALRUS_AGGREGATOR_URL } from "@/config/env";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { useNavigate } from "react-router-dom";

interface NFTData {
  cid: string;
  metadata?: string;
  royalty?: string;
  created_at?: string;
}

export const Dashboard = () => {
  const account = useCurrentAccount();
  const navigate = useNavigate();
  const suiClient = useSuiClient();
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRoyalty, setTotalRoyalty] = useState(0);

  useEffect(() => {
    if (account) {
      loadUserNFTs();
    }
  }, [account]);

  const loadUserNFTs = async () => {
    if (!account) return;

    setLoading(true);
    try {
      // Get owned objects
      const ownedObjects = await suiClient.getOwnedObjects({
        owner: account.address,
        filter: {
          StructType: `${CONTRACT_CONFIG.packageId}::${CONTRACT_CONFIG.moduleName}::DataNFT`,
        },
        options: {
          showContent: true,
          showDisplay: true,
        },
      });

      const nftData: NFTData[] = [];
      let totalAccumulatedRoyalty = 0;

      for (const obj of ownedObjects.data) {
        if (obj.data?.content && 'fields' in obj.data.content) {
          const fields = obj.data.content.fields as any;
          nftData.push({
            cid: fields.walrus_cid || "Unknown",
            metadata: fields.metadata || "",
            royalty: fields.accumulated_royalty || "0",
            created_at: fields.created_at || "",
          });
          totalAccumulatedRoyalty += parseInt(fields.accumulated_royalty || "0");
        }
      }

      setNfts(nftData);
      setTotalRoyalty(totalAccumulatedRoyalty);
    } catch (error) {
      console.error("Error loading NFTs:", error);
      toast.error("Failed to load your NFTs");
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return (
      <Card className="p-12">
        <EmptyState
          icon={FileText}
          title="Connect Your Wallet"
          description="Please connect your wallet to view your Data NFTs and manage your research portfolio"
        />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary to-secondary p-6 text-white shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">Your Dashboard</h2>
            <p className="mt-1 text-sm opacity-90">
              Manage your Data NFTs and track royalties
            </p>
          </div>
          <div className="flex gap-6">
            <div className="rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
              <p className="text-sm opacity-90">Total NFTs</p>
              <p className="text-3xl font-bold">{nfts.length}</p>
            </div>
            <div className="rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
              <p className="text-sm opacity-90">Total Royalties</p>
              <p className="text-3xl font-bold">
                <Coins className="inline h-6 w-6" /> {totalRoyalty}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {loading ? (
        <Card className="p-12">
          <LoadingState message="Loading your NFTs..." />
        </Card>
      ) : nfts.length === 0 ? (
        <Card className="p-12">
          <EmptyState
            icon={FileText}
            title="No NFTs Yet"
            description="Upload and mint your first Data NFT to get started with decentralized science"
            action={{
              label: "Upload Data",
              onClick: () => navigate("/"),
            }}
          />
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {nfts.map((nft, index) => (
            <Card
              key={index}
              className="p-6 shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-hover)]"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <FileText className="h-10 w-10 text-primary" />
                  <Badge variant="secondary" className="bg-accent text-white">
                    Active
                  </Badge>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">Data NFT #{index + 1}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {nft.metadata || "No description"}
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CID:</span>
                    <span className="max-w-[150px] truncate font-mono text-foreground">
                      {nft.cid}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Royalty:</span>
                    <span className="font-semibold text-accent">
                      <Coins className="inline h-3 w-3" /> {nft.royalty}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full transition-colors hover:border-primary hover:text-primary"
                  onClick={() => {
                    window.open(`${WALRUS_AGGREGATOR_URL}/v1/${nft.cid}`, "_blank");
                  }}
                >
                  <ExternalLink className="mr-2 h-3 w-3" />
                  View on Walrus
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
