import https from "https";

function getGameData(endpoint: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "127.0.0.1",
      port: 2999,
      path: endpoint,
      method: "GET",
      rejectUnauthorized: false, // Ignore SSL certificate errors (self-signed certificate)
    };

    const req = https.request(options, (res) => {
      let data = "";

      // Collect response data
      res.on("data", (chunk) => {
        data += chunk;
      });

      // Resolve the promise with the parsed JSON data
      res.on("end", () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      });
    });

    // Handle request errors
    req.on("error", (error) => {
      reject(error);
    });

    // End the request
    req.end();
  });
}

export async function getAllGameData(): Promise<MatchData> {
  const allGameData: MatchData = await getGameData(
    "/liveclientdata/allgamedata",
  );
  return allGameData;
}

export async function getActivePlayerData(): Promise<ActivePlayer> {
  const playerData: ActivePlayer = await getGameData(
    "/liveclientdata/activeplayer",
  );
  return playerData;
}

export async function getPlayerListData(): Promise<Player[]> {
  const playerList: Player[] = await getGameData("/liveclientdata/playerlist");
  return playerList;
}

export async function getEventData(): Promise<GameEvent[]> {
  const eventData: { Events: GameEvent[] } = await getGameData(
    "/liveclientdata/eventdata",
  );
  return eventData.Events;
}