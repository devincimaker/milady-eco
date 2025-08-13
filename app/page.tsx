"use client";

import Image from "next/image";
import { useCoingeckoData } from "@/hooks/useCoingeckoData";

export default function Home() {
  const { mcapUsd: miladyMcap } = useCoingeckoData("milady-maker");
  const { mcapUsd: remilioMcap } = useCoingeckoData("redacted-remilio-babies");

  const totalMcap = (miladyMcap ?? 0) + (remilioMcap ?? 0);

  const formatMcap = (mcap: number | null) => {
    if (!mcap) return "N/A";
    return mcap.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div>
      <h1>Milady Maker</h1>
      <Image
        src="/images/milady.jpg"
        alt="Milady Maker"
        width={100}
        height={100}
      />
      <p>Market Cap: {formatMcap(miladyMcap)}</p>
      <h1>Remilio Collective</h1>
      <Image
        src="/images/remilio.png"
        alt="Remilio Collective"
        width={100}
        height={100}
      />
      <p>Market Cap: {formatMcap(remilioMcap)}</p>
      <h1>Total Market Cap</h1>
      <p>Market Cap: {formatMcap(totalMcap)}</p>
    </div>
  );
}
