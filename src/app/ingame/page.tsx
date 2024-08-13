import { getActivePlayerData, getAllGameData, getEventData, getPlayerListData } from "@/api/gameclient/api";
import { getSummoner } from "@/api/leagueconnect/api";
import { redirect } from "next/navigation";
import { calculateTotalGoldSpent, displayPlayerItems } from "@/utils/utils";
import { MatchData, ActivePlayer, Player, GameEvent } from "@/types";

export default async function ingame() {
  const summoner = await getSummoner();
  if (!summoner) {
    redirect("/");
  }

  const gameData: MatchData = await getAllGameData();
  const playerData: ActivePlayer = await getActivePlayerData();
  const playerList: Player[] = await getPlayerListData();
  const eventData: GameEvent[] = await getEventData();

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>You are now ingame, {summoner.gameName}</h1>

      <section>
        <h2>Game Data</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>Mode:</td>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>{gameData.gameData.gameMode}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>Time:</td>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>{gameData.gameData.gameTime}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>Map:</td>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                {gameData.gameData.mapName} (Terrain: {gameData.gameData.mapTerrain})
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h2>Active Player Data</h2>
        <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
          <li><strong>Name:</strong> {playerData.summonerName}</li>
          <li><strong>Level:</strong> {playerData.level}</li>
          <li><strong>Current Gold:</strong> {playerData.currentGold}</li>
          <li><strong>Health:</strong> {playerData.championStats.currentHealth}/{playerData.championStats.maxHealth}</li>
          <li><strong>Attack Damage:</strong> {playerData.championStats.attackDamage}</li>
          <li><strong>Armor:</strong> {playerData.championStats.armor}</li>
          <li><strong>Magic Resist:</strong> {playerData.championStats.magicResist}</li>
          <li><strong>Abilities:</strong>
            <ul style={{ listStyleType: "circle", paddingLeft: "20px" }}>
              <li>Q: {playerData.abilities.Q.displayName}</li>
              <li>W: {playerData.abilities.W.displayName}</li>
              <li>E: {playerData.abilities.E.displayName}</li>
              <li>R: {playerData.abilities.R.displayName}</li>
              <li>Passive: {playerData.abilities.Passive.displayName}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h2>Player List</h2>
        {playerList.map((player: Player) => (
          <div key={player.summonerName} style={{ marginBottom: "20px" }}>
            <h3>{player.summonerName} ({player.championName})</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>Level:</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{player.level}</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>Kills/Deaths/Assists:</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {player.scores.kills}/{player.scores.deaths}/{player.scores.assists}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>Creep Score:</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{player.scores.creepScore}</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>Total Gold Spent:</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{calculateTotalGoldSpent(player)}</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>Items:</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{displayPlayerItems(player)}</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>Runes:</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{player.runes.keystone.displayName}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </section>

      <section style={{ marginTop: "20px" }}>
        <h2>Event Data</h2>
        {eventData.map((event: GameEvent) => (
          <div key={event.EventID} style={{ marginBottom: "10px" }}>
            <p><strong>Event:</strong> {event.EventName}</p>
            <p><strong>Time:</strong> {event.EventTime}</p>
            {event.KillerName && <p><strong>Killer:</strong> {event.KillerName}</p>}
            {event.TurretKilled && <p><strong>Turret Killed:</strong> {event.TurretKilled}</p>}
          </div>
        ))}
      </section>
    </main>
  );
}
