import { getAllChampions, getAllItems } from "@/api/datadragon/api";
import { getCurrentState, getSummoner } from "@/api/leagueconnect/api";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const summoner = await getSummoner();

  if (summoner) {
    const currentState = await getCurrentState();
    if (!currentState) {
      throw new Error("this is impossible");
    }
    if (currentState === "InProgress") {
      return redirect("/ingame");
    }
  }

  const champions = await getAllChampions();
  const items = await getAllItems();

  if (!champions || !items) {
    throw new Error("Error retrieving champions or items from Data Dragon");
  }

  console.log(champions);
  console.log(items);

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
