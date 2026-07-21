import type { CSSProperties } from "react";
import {
  SnowflakeIcon,
  FridgeIcon,
  WashingMachineIcon,
  BoltIcon,
  WrenchIcon,
  GearIcon,
  ThermometerIcon,
} from "@/components/icons";

type DecoStyle = CSSProperties & { "--dur"?: string; "--delay"?: string };

const icons: { style: DecoStyle; Icon: typeof SnowflakeIcon }[] = [
  { style: { top: "14%", left: "4%", width: 54, height: 54, "--dur": "9s", "--delay": "0s" }, Icon: SnowflakeIcon },
  { style: { top: "8%", right: "6%", width: 60, height: 60, "--dur": "11s", "--delay": "1.2s" }, Icon: FridgeIcon },
  { style: { top: "42%", right: "3%", width: 50, height: 50, "--dur": "10s", "--delay": ".6s" }, Icon: WashingMachineIcon },
  { style: { top: "68%", left: "5%", width: 46, height: 46, "--dur": "8s", "--delay": "1.8s" }, Icon: BoltIcon },
  { style: { top: "34%", left: "7%", width: 44, height: 44, "--dur": "12s", "--delay": ".3s" }, Icon: WrenchIcon },
  { style: { top: "80%", right: "8%", width: 48, height: 48, "--dur": "9.5s", "--delay": "2.4s" }, Icon: GearIcon },
  { style: { top: "56%", left: "3%", width: 46, height: 46, "--dur": "13s", "--delay": "1s" }, Icon: ThermometerIcon },
];

const dots: DecoStyle[] = [
  { top: "22%", left: "46%", "--dur": "4s", "--delay": "0s" },
  { top: "74%", left: "30%", "--dur": "5s", "--delay": "1.1s" },
  { top: "50%", left: "88%", "--dur": "3.6s", "--delay": ".5s" },
  { top: "90%", left: "60%", "--dur": "4.6s", "--delay": "1.7s" },
  { top: "30%", left: "70%", "--dur": "5.4s", "--delay": ".9s" },
  { top: "12%", left: "24%", "--dur": "4.2s", "--delay": "2.1s" },
];

/** Fixed ambient layer: floating appliance icons + pulsing dots behind all content. */
export function BackgroundDeco() {
  return (
    <div className="bg-deco" aria-hidden="true">
      {icons.map(({ style, Icon }, i) => (
        <span key={i} className="bg-deco__icon" style={style}>
          <Icon />
        </span>
      ))}
      {dots.map((style, i) => (
        <span key={i} className="bg-deco__dot" style={style} />
      ))}
    </div>
  );
}
