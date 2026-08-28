import { WhatsAppIcon } from "@/components/site/icons";

export function WhatsAppFab({ number }: { number: string }) {
  return (
    <a
      className="wa"
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}
