import { getAllChampions, getAllItems } from "@/api/datadragon/api";
import { getSummoner } from "@/api/leagueconnect/api";
import { insertMissingChampionsAndItems } from "@/server/db/dumper";



export default async function Home() {
  // Check and update champion and item data (optional)
  const champions = await getAllChampions();
  const items = await getAllItems();
  if (champions && items) {
    insertMissingChampionsAndItems(champions, items);
  }

  const summoner = await getSummoner();



  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      {summoner ? (
        <>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome, {summoner.gameName}!</h1>
            <h2 className="text-2xl font-bold mb-4">In order to use this app, go in-game and refresh the page!</h2>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Please log in to League of Legends to continue</h1>
        </div>
      )}
    </main>
  );
}
