"use client";

import { useRef, useState } from "react";

import { ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/hooks/use-admin";

interface ImageFieldProps {
  value: string;
  onChange: (url: string) => void;
  id?: string;
  aspect?: string;
}

/** Text input for an image path + upload button with preview. */
export function ImageField({ value, onChange, id, aspect = "aspect-video" }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const pick = async (file: File | undefined) => {
    if (!file) {
      return;
    }
    setBusy(true);
    try {
      onChange(await uploadImage(file));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex gap-3">
      <div
        className={`bg-muted relative w-32 shrink-0 overflow-hidden rounded-md border ${aspect}`}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary uploaded paths
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="text-muted-foreground grid h-full place-items-center text-xs">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/…"
        />
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => void pick(e.target.files?.[0])}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            {busy ? <Loader2 className="animate-spin" /> : <ImagePlus />}
            Upload image
          </Button>
        </div>
      </div>
    </div>
  );
}
