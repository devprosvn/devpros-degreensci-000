import { useState } from "react";
import { toast } from "sonner";

interface WalrusUploadResponse {
  blob_id: string;
  content_id: string;
  size: number;
}

const WALRUS_UPLOAD_URL = "https://upload-relay.testnet.walrus.space/v1/blobs";
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
        const formData = new FormData();
        formData.append("file", file);

        setProgress(30);

        const response = await fetch(WALRUS_UPLOAD_URL, {
          method: "POST",
          body: formData,
        });

        setProgress(60);

        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`);
        }

        const data: WalrusUploadResponse = await response.json();
        
        setProgress(100);
        setUploading(false);

        if (!data.content_id) {
          throw new Error("No content_id returned from Walrus");
        }

        return data.content_id;
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
