import { getActivePlayerData, getPlayerListData } from "@/api/gameclient/api";
import { formatPosition } from "@/utils/utils";
import { getCurrentState, getSummoner } from "@/api/leagueconnect/api";
import { redirect } from "next/navigation";
import ChampSelectCard from "./champ-select-card";

export default async function ChampSelect() {
  // const [playerData, playerList, summoner] = await Promise.all([
  //   getActivePlayerData(),
  //   getPlayerListData(),
  //   getSummoner(),
  // ]);

  // if (!summoner) {
  //   redirect("/");
  // }

  return (
    <main className="mx-auto flex flex-col drop-shadow-2xl p-6">
      <h1>THIS PAGE IS WIP</h1>
      {/* <h1 className="text-3xl font-bold mb-6">Champion Select</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {playerList.map((player) => (
          <ChampSelectCard
            key={player.summonerName}
            championName={player.championName}
            summonerName={player.summonerName}
            role={formatPosition(player.position)}
          />
        ))}
      </section> */}
    </main>
  );
}
