"use client";

import { Icon } from "@/components/site/icons";
import type { ApplianceType } from "@/lib/validations/booking";
import type { IconKey } from "@/lib/validations/content";
import { useBookingDialogStore } from "@/store/useBookingDialogStore";

/** Maps a service card's icon to the appliance the booking form should pre-select. */
const ICON_TO_APPLIANCE: Partial<Record<IconKey, ApplianceType>> = {
  ac: "ac",
  fridge: "refrigerator",
  geyser: "geyser",
  microwave: "microwave",
  mixer: "mixer-grinder",
  induction: "induction",
  pcb: "pcb-electrical",
  install: "ac",
};

/** Service grid card: opens the booking dialog with its appliance pre-selected. */
export function ServiceCard({
  icon,
  title,
  subtitle,
}: {
  icon: IconKey;
  title: string;
  subtitle: string;
}) {
  const openDialog = useBookingDialogStore((s) => s.openDialog);
  const appliance = ICON_TO_APPLIANCE[icon] ?? "other";

  return (
    <div
      className="glow-card"
      role="button"
      tabIndex={0}
      onClick={() => openDialog(appliance)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDialog(appliance);
        }
      }}
    >
      <div className="svc">
        <div className="ico">
          <Icon name={icon} />
        </div>
        <b>{title}</b>
        <small>{subtitle}</small>
      </div>
    </div>
  );
}
