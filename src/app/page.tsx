import { getSummoner, inGameCheck } from "@/api/leagueconnect/api";
import Image from "next/image";

export default async function Home() {
  const summoner = await getSummoner()
  inGameCheck()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <h1>{summoner.gameName}</h1>
    </main>
  );
}
