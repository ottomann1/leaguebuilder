import { getActivePlayerData, getAllGameData, getEventData, getPlayerListData } from "@/api/gameclient/api";
import {  getSummoner } from "@/api/leagueconnect/api";
import { redirect } from "next/navigation";
import PlayerCard from "./player-card";
import { formatTime } from "@/utils/utils";
import Timeline from "./timeline";
 
type DragonData = {
  champions: DDChampion[] | null;
  items: DDItem[] | null;
}


export default async function ingame(){
  // Use Promise.all to fetch data concurrently
  const [gameData, playerData, playerList, eventData, summoner] = await Promise.all([
    getAllGameData(),
    getActivePlayerData(),
    getPlayerListData(),
    getEventData(),
    getSummoner()
  ]);
  if (!summoner) {
    redirect("/");
  }
  console.log(eventData)


  return (
    <main className="p-4 mx-auto flex flex-col drop-shadow-2xl">
      <h1>You are now ingame, {summoner.gameName}</h1>
      <section className="mb-4">
        <h2 className="text-xl font-semibold">Gamemode: {gameData.gameData.gameMode} {gameData.gameData.mapName}</h2>
        
        <div className="flex justify-between items-start">
          {/* Game Time */}
          <div className="flex-1 mr-4">
            <h2 className="text-xl font-semibold">Current Game Time: {formatTime(gameData.gameData.gameTime)}</h2>
          </div>
          
          {/* Timeline */}
          <div className="flex-none">
            <Timeline eventData={eventData} />
          </div>
        </div>
      </section>

      <section>
        <PlayerCard playerList={playerList} eventData={eventData} gameTime={gameData.gameData.gameTime} />
      </section>
    </main>
  );
}