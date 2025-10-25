import { useState } from "react";
import { UploadForm } from "@/components/UploadForm";
import { VerifyMintButton } from "@/components/VerifyMintButton";

const Upload = () => {
  const [walrusCid, setWalrusCid] = useState("");
  const [metadata, setMetadata] = useState("");

  const handleUploadSuccess = (cid: string, meta: string) => {
    setWalrusCid(cid);
    setMetadata(meta);
  };

  const handleMintSuccess = () => {
    // Clear form after successful mint
    setWalrusCid("");
    setMetadata("");
    // Show success message
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground">
          Mint Your Research as Data NFTs
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Upload your scientific data to decentralized storage and mint it as a verified NFT on Sui blockchain
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <UploadForm onUploadSuccess={handleUploadSuccess} />
        <VerifyMintButton
          walrusCid={walrusCid}
          metadata={metadata}
          onMintSuccess={handleMintSuccess}
        />
      </div>
    </div>
  );
};

export default Upload;
