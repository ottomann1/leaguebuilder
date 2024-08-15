import { getActivePlayerData, getAllGameData, getEventData, getPlayerListData } from "@/api/gameclient/api";
import { getSummoner } from "@/api/leagueconnect/api";
import { redirect } from "next/navigation";
import PlayerCard from "./player-card";
import { formatPosition, formatTime } from "@/utils/utils";
import Timeline from "./timeline";
import ItemsCardWrapper from "./item-card-wrapper";
import ItemsCard from "./items-card";

export default async function ingame() {

  const [gameData, playerData, playerList, eventData] = await Promise.all([
    getAllGameData(),
    getActivePlayerData(),
    getPlayerListData(),
    getEventData(),

  ]);

  // if (!summoner) {
  //   redirect("/");
  // }

  return (
    <main className="mx-auto flex flex-col drop-shadow-2xl">
        <div className="flex justify-between items-start">

          <section>
            <ItemsCard
              gameTime={gameData.gameData.gameTime}
              eventData={eventData}
              playerList={playerList}
              playerData={playerData}
            />
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
