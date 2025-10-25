import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Upload, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { WALRUS_PUBLISHER_URL } from "@/config/env";

interface UploadFormProps {
  onUploadSuccess: (cid: string, metadata: string) => void;
}

export const UploadForm = ({ onUploadSuccess }: UploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState("");
  const [uploading, setUploading] = useState(false);
  const [walrusCid, setWalrusCid] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      toast.success(`File selected: ${acceptedFiles[0].name}`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'application/json': ['.json'],
      'text/csv': ['.csv'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    }
  });

  const handleUploadToWalrus = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    if (!metadata.trim()) {
      toast.error("Please provide metadata description");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${WALRUS_PUBLISHER_URL}/v1/store`, {
        method: "PUT",
        body: file,
      });

      if (!response.ok) {
        throw new Error("Failed to upload to Walrus");
      }

      const data = await response.json();
      const cid = data.newlyCreated?.blobObject?.blobId || data.alreadyCertified?.blobId;
      
      if (!cid) {
        throw new Error("No CID returned from Walrus");
      }

      setWalrusCid(cid);
      onUploadSuccess(cid, metadata);
      toast.success("File uploaded to Walrus successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file to Walrus");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-hover)]">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Upload & Describe</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload your research data to Walrus decentralized storage
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-sm font-medium text-foreground">
            {file ? file.name : "Drop your file here or click to browse"}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Supports PDF, JSON, CSV, and images
          </p>
        </div>

        {file && (
          <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
            <FileText className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="metadata">Metadata Description</Label>
          <Textarea
            id="metadata"
            placeholder="Describe your research data: title, abstract, methods, key findings..."
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
            rows={6}
            className="resize-none"
          />
        </div>

        {walrusCid && (
          <div className="space-y-2">
            <Label>Walrus CID</Label>
            <Input value={walrusCid} readOnly className="font-mono text-xs" />
          </div>
        )}

        <Button
          onClick={handleUploadToWalrus}
          disabled={!file || !metadata.trim() || uploading}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          size="lg"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading to Walrus...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload to Walrus
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
