import { getCurrentState, getMatchData, getSummoner,  loginCheck } from "@/api/leagueconnect/api";
import { startWebSocket } from "@/api/leagueconnect/websocket";
import Image from "next/image";

export default async function Home() {
  const summoner = await getSummoner()
  loginCheck()
  const gameState = await getCurrentState()
  console.log(gameState)
  const data = await getMatchData()
  console.log(data)
  startWebSocket()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {summoner ? (
        <h1>{summoner.gameName}</h1>
      ) : (
        <h1>Please log in</h1>
      )}
    </main>
  );
}
