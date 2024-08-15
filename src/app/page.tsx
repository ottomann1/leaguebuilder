import { getAllChampions, getAllItems } from "@/api/datadragon/api";
import { getCurrentState, getSummoner } from "@/api/leagueconnect/api";
import { insertMissingChampionsAndItems, insertViableItemsForChampion } from "@/server/db/dumper";
import { redirect } from "next/navigation";
import {scrapeOPGGItems} from "@/utils/scraper"

export default async function Home() {
  // const champions = await getAllChampions()
  // const items = await getAllItems()
  // if(!champions||!items){
  //   throw new Error("toss yo ass home")
  // }
  // insertMissingChampionsAndItems(champions, items)
  const summoner = await getSummoner();

  if (summoner) {
    const currentState = await getCurrentState();
    console.log(currentState)
    if (!currentState) {
      throw new Error("this is impossible");
    }
    if (currentState === "InProgress") {
      return redirect("/ingame");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {summoner ? (
        <>
          <h1>{summoner.gameName}</h1>
        </>
      ) : (
        <h1>Please log in</h1>
      )}

    </main>
  );
}


