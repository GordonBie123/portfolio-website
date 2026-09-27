import { Cafe } from "@/components/cafe/Cafe";
import { StatsCard } from "@/components/cafe/StatsCard";

export default function Landing() {
  return <Cafe stats={<StatsCard />} />;
}
