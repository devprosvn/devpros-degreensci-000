import { useState } from "react";
import { toast } from "sonner";
import { WALRUS_SECRET } from "@/config/env";

interface WalrusUploadResponse {
  blobId: string;
  size?: number;
  cost?: number;
  message?: string;
}

const WALRUS_UPLOAD_URL = "https://degreensci.work-devpros.workers.dev/";
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

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(WALRUS_UPLOAD_URL, {
          method: "POST",
          headers: {
            "x-proxy-secret": WALRUS_SECRET,
          },
          body: formData,
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

        if (!data.blobId) {
          throw new Error("No blobId returned from Walrus proxy");
        }

        return data.blobId;
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
