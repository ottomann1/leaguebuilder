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
        <div className="flex justify-between items-start">

          <section>
          {!viableItems ? (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <ItemsCard
              championName={championName}
              summonerName={summoner.gameName}
              position={position}
              gameTime={gameData.gameData.gameTime}
              eventData={eventData}
              currentGold={currentGold}
              viableItems={viableItems}
            />
          )}
        </section>
          
          <section>
            <div className="flex">
            <Timeline eventData={eventData} />
          </div>
          </section>
          

        </div>

      <section>
        <PlayerCard playerList={playerList} eventData={eventData} gameTime={gameData.gameData.gameTime} />
      </section>
    </main>
  );
}
