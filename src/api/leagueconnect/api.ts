"use server";

import {
  authenticate,
  createHttp2Request,
  createHttpSession,
  LeagueClient,
} from "league-connect";
import { revalidatePath } from "next/cache";

export async function getSummoner(): Promise<Summoner | null> {
  try {
    const credentials = await authenticate();
    const session = await createHttpSession(credentials);

    try {
      const response = await createHttp2Request(
        {
          method: "GET",
          url: "/lol-summoner/v1/current-summoner",
        },
        session,
        credentials,
      );

      const summoner: Summoner = await response.json();
      console.log("getsummoner loaded");

      return summoner;
    } finally {
      session.close();
    }
  } catch (error) {
    console.error("Failed to authenticate or retrieve summoner:", error);
    return null;
  }
}

export async function loginCheck() {
  const credentials = await authenticate();
  const client = new LeagueClient(credentials);

  client.start(); // Start listening for process updates
  client.on("connect", (newCredentials) => {
    console.log(newCredentials);
  });

  client.on("disconnect", () => {
    console.log("disconnect");
    client.stop();
    revalidatePath("/");
  });
}

export async function getCurrentState(): Promise<string | null> {
  try {
    const credentials = await authenticate();
    const session = await createHttpSession(credentials);

    try {
      const response = await createHttp2Request(
        {
          method: "GET",
          url: "/lol-gameflow/v1/gameflow-phase",
        },
        session,
        credentials,
      );

      const gameState: string = await response.json();
      console.log("currentstate loaded");

      return gameState;
    } finally {
      session.close();
    }
  } catch (error) {
    console.error("Error checking game flow phase:", error);
    return null;
  }
}
// Function to get data from the current match
export async function getMatchData(): Promise<any> {
  if ((await getCurrentState()) !== "InProgress") {
    console.log("Not currently in a game.");
    return null;
  }

  try {
    const credentials = await authenticate();
    const session = await createHttpSession(credentials);

    try {
      const response = await createHttp2Request(
        {
          method: "GET",
          url: "/lol-live-client-data/v1/active-player",
        },
        session,
        credentials,
      );

      const playerData = await response.json();
      console.log("matchdata loaded");

      return playerData;
    } finally {
      session.close();
    }
  } catch (error) {
    console.error("Error retrieving match data:", error);
    return null;
  }
}

export async function getCurrentMatchInfo() {
  try {
    // Authenticate and get credentials
    const credentials = await authenticate();

    // Create an HTTP/2 session with the client
    const session = await createHttpSession(credentials);

    try {
      // Send a GET request to the Live Client Data API to get all game data
      const response = await createHttp2Request(
        {
          method: "GET",
          url: "/liveclientdata/allgamedata",
        },
        session,
        credentials,
      );

      // Parse the response JSON
      const matchData = await response.json();

      console.log("Current Match Info:", matchData);

      return matchData;
    } finally {
      session.close(); // Always close the session
    }
  } catch (error) {
    console.error("Error fetching current match info:", error);
    return null;
  }
}
