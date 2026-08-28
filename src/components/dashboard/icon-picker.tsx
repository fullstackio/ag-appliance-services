"use client";

import { Icon } from "@/components/site/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICON_KEYS, type IconKey } from "@/lib/validations/content";

export function IconPicker({
  value,
  onChange,
  id,
}: {
  value: IconKey;
  onChange: (v: IconKey) => void;
  id?: string;
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as IconKey)}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ICON_KEYS.map((k) => (
          <SelectItem key={k} value={k}>
            <span className="flex items-center gap-2">
              <Icon name={k} className="size-4 fill-none stroke-current stroke-2" />
              {k}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
