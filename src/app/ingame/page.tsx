import { getActivePlayerData, getAllGameData, getEventData, getPlayerListData } from "@/api/gameclient/api";
import {  getSummoner } from "@/api/leagueconnect/api";
import { redirect } from "next/navigation";
import AllPlayers from "./all-players";
 
type DragonData = {
  champions: DDChampion[] | null;
  items: DDItem[] | null;
}


export default async function ingame(){
  const gameData: MatchData = await getAllGameData();
  const playerData: ActivePlayer = await getActivePlayerData();
  const playerList: Player[] = await getPlayerListData();
  const eventData: GameEvent[] = await getEventData();
  const summoner = await getSummoner();
  if (!summoner) {
    redirect("/");
  }



  // const allItems = await getAllItems();
  // const allChampions = await getAllChampions();

  // if(!allItems || !allChampions){
  //   throw new Error("unable to retrieve items or champions from data dragon")
  // }


  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>You are now ingame, {summoner.gameName}</h1>
      
      <section>
        <AllPlayers playerList={playerList} eventData={eventData} />
      </section>

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
            <tr>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>Map Number:</td>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>{gameData.gameData.mapNumber}</td>
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
          <li><strong>Move Speed:</strong> {playerData.championStats.moveSpeed}</li>
          <li><strong>Resource Type:</strong> {playerData.championStats.resourceType}</li>
          <li><strong>Resource:</strong> {playerData.championStats.resourceValue}/{playerData.championStats.resourceMax}</li>
          <li><strong>Resource Regen Rate:</strong> {playerData.championStats.resourceRegenRate}</li>
          <li><strong>Spell Vamp:</strong> {playerData.championStats.spellVamp}</li>
          <li><strong>Life Steal:</strong> {playerData.championStats.lifeSteal}</li>
          <li><strong>Tenacity:</strong> {playerData.championStats.tenacity}</li>
          <li><strong>Heal Shield Power:</strong> {playerData.championStats.healShieldPower}</li>
          <li><strong>Abilities:</strong>
            <ul style={{ listStyleType: "circle", paddingLeft: "20px" }}>
              <li>Q: {playerData.abilities.Q.displayName}</li>
              <li>W: {playerData.abilities.W.displayName}</li>
              <li>E: {playerData.abilities.E.displayName}</li>
              <li>R: {playerData.abilities.R.displayName}</li>
              <li>Passive: {playerData.abilities.Passive.displayName}</li>
            </ul>
          </li>
          <li><strong>Runes:</strong>
            <ul style={{ listStyleType: "circle", paddingLeft: "20px" }}>
              <li>Keystone: {playerData.fullRunes.keystone.displayName}</li>
              <li>Primary Tree: {playerData.fullRunes.primaryRuneTree.displayName}</li>
              <li>Secondary Tree: {playerData.fullRunes.secondaryRuneTree.displayName}</li>
              <li>General Runes:</li>
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                {playerData.fullRunes.generalRunes.map((rune) => (
                  <li key={rune.id}>{rune.displayName}</li>
                ))}
              </ul>
              <li>Stat Runes:</li>
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                {playerData.fullRunes.statRunes.map((rune) => (
                  <li key={rune.id}>{rune.displayName}</li>
                ))}
              </ul>
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
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>Position:</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{player.position}</td>
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
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>Ward Score:</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{player.scores.wardScore}</td>
                </tr>
                {/* <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>Gold spent:</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{calculateTotalGoldSpent(player, data.items)}</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>Items:</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{displayPlayerItems(player, data.items)}</td>
                </tr> */}
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>Runes:</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{player.runes.keystone.displayName}</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>Summoner Spells:</td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {player.summonerSpells.summonerSpellOne.displayName} / {player.summonerSpells.summonerSpellTwo.displayName}
                  </td>
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
            {event.Assisters && event.Assisters.length > 0 && <p><strong>Assisters:</strong> {event.Assisters.join(", ")}</p>}
            {event.KillerName && <p><strong>Killer:</strong> {event.KillerName}</p>}
            {event.TurretKilled && <p><strong>Turret Killed:</strong> {event.TurretKilled}</p>}
          </div>
        ))}
      </section>
    </main>
  );
}
