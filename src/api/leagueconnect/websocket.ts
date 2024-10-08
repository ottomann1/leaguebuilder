import { redirectChamp, redirectHome, redirectIngame } from "@/actions/actions";
import { createWebSocketConnection } from "league-connect";

export async function startWebSocket() {
  try {
    const ws = await createWebSocketConnection({
      authenticationOptions: {
        awaitConnection: true,
      },
    });

    ws.on("open", () => {
      console.log("WebSocket connection established.");
    });

    ws.on("message", (data) => {
      try {
        const rawData = data.toString();

        if (!rawData) {
          console.log("Received empty data");
          return;
        }

        const event = JSON.parse(rawData);

        // console.log(event[2].uri)


        if (event[2].uri === "/lol-gameflow/v1/session") {
          handleGameState(event[2].data.phase);
        }
        if(event[2].uri === '/lol-champ-select/v1/session'){
          console.log("lolchampselecctseesiobn")
          redirectChamp()
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        console.error("Raw message:", data.toString());
      }
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed.");
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  } catch (error) {
    console.error("Error starting WebSocket:", error);
  }
}

function handleGameData(gameData: any) {
  console.log("Game Data:", gameData);

  const recommendations = calculateItemRecommendations(gameData);
  console.log("Recommended Items:", recommendations);
}

function handleGameState(gameState: string) {
  console.log("Game State Phase:", gameState);

  if (gameState === "InProgress") {
    console.log("In-game");
    redirectIngame()
  }
  if (gameState === "ChampSelect") {
    console.log("Champ Select");
    redirectChamp()
  } 
  if (gameState === "None"){
    console.log("None")
    redirectHome()
  }
  else {
    console.log("Game State:", gameState);
  }
}

function calculateItemRecommendations(gameData: any) {
  const playerData = gameData.activePlayer;
  const teamData = gameData.allPlayers.filter(
    (player:Player) => player.team === playerData.team,
  );

  return {
    recommendedItems: ["Item1", "Item2", "Item3"],
    playerData,
    teamData,
  };
}
