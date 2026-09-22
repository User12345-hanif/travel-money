import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PopularCurrencies } from "@/components/sections/PopularCurrencies";
import { ExchangeRatePreview } from "@/components/sections/ExchangeRatePreview";
import { TravelMoneyTools } from "@/components/sections/TravelMoneyTools";
import { Destinations } from "@/components/sections/Destinations";
import { createMetadata } from "@/lib/seo";
import { getRateSnapshot } from "@/lib/rates/snapshot";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Travel Money Tools: Convert, Plan and Prepare",
    description:
      "Convert published travel currencies, plan a trip budget, and prepare cash, cards and ATM withdrawals. Indicative rates for planning — Wayfare does not sell currency.",
    path: "/",
  }),
  title: {
    absolute: "Travel Money Tools: Convert, Plan and Prepare · Wayfare",
  },
};

export default async function Home() {
  const rateTable = await getRateSnapshot();

  return (
    <>
      <Hero rateTable={rateTable} />
      <TrustStrip rateTable={rateTable} />
      <PopularCurrencies rateTable={rateTable} />
      <ExchangeRatePreview rateTable={rateTable} />
      <TravelMoneyTools />
      <div id="destinations" className="scroll-mt-24">
        <Destinations />
      </div>
    </>
  );
}
