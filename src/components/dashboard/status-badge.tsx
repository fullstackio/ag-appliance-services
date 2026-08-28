import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STYLES: Record<string, string> = {
  new: "bg-brand-copper text-white",
  confirmed: "bg-blue-600 text-white",
  completed: "bg-emerald-600 text-white",
  cancelled: "bg-zinc-500 text-white",
  read: "bg-blue-600 text-white",
  closed: "bg-zinc-500 text-white",
  pending: "bg-amber-500 text-white",
  active: "bg-emerald-600 text-white",
  disabled: "bg-zinc-500 text-white",
  owner: "bg-brand-ink text-brand-gold",
  admin: "bg-brand-cream text-brand-ink dark:bg-zinc-700 dark:text-white",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return <Badge className={cn("capitalize", STYLES[status] ?? "", className)}>{status}</Badge>;
}
