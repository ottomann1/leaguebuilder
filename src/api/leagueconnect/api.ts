import {
  authenticate,
  createHttp2Request,
  createHttpSession,
  LeagueClient,
} from "league-connect";

export async function getSummoner(): Promise<Summoner> {
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
    return summoner;
  } finally {
    session.close();
  }
}

export async function inGameCheck() {
  const credentials = await authenticate();
  const client = new LeagueClient(credentials);

  client.start(); // Start listening for process updates
  client.on("connect", (newCredentials) => {
    console.log(newCredentials);
  });

  client.on("disconnect", () => {
    console.log("disconnect");
  });
}
