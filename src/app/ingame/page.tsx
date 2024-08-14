import { getActivePlayerData, getAllGameData, getEventData, getPlayerListData } from "@/api/gameclient/api";
import { getSummoner } from "@/api/leagueconnect/api";
import { redirect } from "next/navigation";
import PlayerCard from "./player-card";
import { formatPosition, formatTime } from "@/utils/utils";
import Timeline from "./timeline";
import ItemsCard from "./items-card";
import { viableItems } from "@/server/db/schema";
import { insertViableItemsForChampion } from "@/server/db/dumper";
import { scrapeOPGGItems } from "@/utils/scraper";

export default async function ingame() {

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

  const currentPlayer = playerList.find(player => player.summonerName === playerData.summonerName);

  if (!currentPlayer) {
    throw new Error("Current player not found in player list.");
  }

  // Get the champion name and formatted position
  const championName = currentPlayer.championName;
  const position = formatPosition(currentPlayer.position);
  const currentGold = playerData.currentGold;

  const viableItems = await scrapeOPGGItems(championName, position).then(x=>{
    insertViableItemsForChampion(championName, position, x)
    return x
  })

  return (
    <main className="mx-auto flex flex-col drop-shadow-2xl">
      <h1>You are now ingame, {summoner.gameName}</h1>
      <section className="mb-4">
        <h2 className="text-xl font-semibold">Gamemode: {gameData.gameData.gameMode} {gameData.gameData.mapName}</h2>

        <div className="flex justify-between items-start">
          {/* Game Time */}
          <div className="flex-1 mr-4">
            <h2 className="text-xl font-semibold">Current Game Time: {formatTime(gameData.gameData.gameTime)}</h2>
          </div>
          <section>
          {!viableItems ? (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <ItemsCard
              championName={championName}
              position={position}
              gameTime={gameData.gameData.gameTime}
              eventData={eventData}
              currentGold={currentGold}
              viableItems={viableItems}
            />
          )}
        </section>

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
