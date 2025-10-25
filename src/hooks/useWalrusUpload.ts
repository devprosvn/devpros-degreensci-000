import { useState } from "react";
import { toast } from "sonner";

interface WalrusUploadResponse {
  newlyCreated?: {
    blobObject: {
      blobId: string;
      size: number;
    };
    cost: number;
  };
  alreadyCertified?: {
    blobId: string;
    endEpoch: number;
  };
}

const WALRUS_UPLOAD_URL = "https://wal-publisher-testnet.staketab.org/v1/blobs";
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
const MAX_RETRIES = 2;

export const useWalrusUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadToWalrus = async (file: File): Promise<string> => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size exceeds 25 MB limit");
    }

    setUploading(true);
    setProgress(0);

    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        setProgress(30);

        const response = await fetch(WALRUS_UPLOAD_URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/octet-stream",
          },
          body: file,
        });

        setProgress(60);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Upload failed: ${response.status} ${errorText}`);
        }

        const data: WalrusUploadResponse = await response.json();
        console.log("Walrus upload response:", data);
        
        setProgress(100);
        setUploading(false);

        // Extract blobId from response
        const blobId = data.newlyCreated?.blobObject.blobId || data.alreadyCertified?.blobId;
        
        if (!blobId) {
          throw new Error("No blobId returned from Walrus");
        }

        return blobId;
      } catch (error) {
        lastError = error as Error;
        console.error(`Upload attempt ${attempt + 1} failed:`, error);
        
        if (attempt < MAX_RETRIES) {
          toast.info(`Upload failed, retrying... (${attempt + 1}/${MAX_RETRIES})`);
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        }
      }
    }

    setUploading(false);
    setProgress(0);
    throw lastError || new Error("Upload failed after retries");
  };

  return {
    uploadToWalrus,
    uploading,
    progress,
  };
};
