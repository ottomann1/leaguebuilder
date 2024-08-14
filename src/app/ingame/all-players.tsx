"use client"

import React, { useEffect } from "react";
import { useStaticData } from "@/context/StaticDataContext";
import Image from "next/image";
import { calculateTotalGoldSpent } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { revalidate } from "@/actions/actions";

interface AllPlayersProps {
  playerList: Player[];
  eventData: GameEvent[];
}

export function AllPlayers({ playerList, eventData }:AllPlayersProps){
    const staticData = useStaticData();
    const champions = staticData.champions;
    const items = staticData.items;

    async function handleClick(){
        await revalidate()
    }

    if (!champions || !items) {
      return <div>Loading...</div>;
    }

    const itemsArr = Object.values(items)


  return (
    <section style={{ marginTop: "20px" }}>
      <h2>Player List</h2>
      <button onClick={handleClick}>revalidate</button>
      {playerList.map((player: Player) => {
        const champion = champions?.find(
          (champ) => champ.id === player.championName
        );
        return (
          <div key={player.summonerName} style={{ marginBottom: "20px" }}>
            <h3>
              {player.summonerName} ({player.championName})
            </h3>
            {champion && (
              <div>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/14.16.1/img/champion/${champion.image.full}`}
                  alt={champion.name}
                  width={champion.image.w}
                  height={champion.image.h}
                  className="mb-2"
                />
                <p>{champion.title}</p>
                <p>{champion.blurb}</p>
              </div>
            )}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Level:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {player.level}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Position:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {player.position}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Kills/Deaths/Assists:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {player.scores.kills}/{player.scores.deaths}/
                    {player.scores.assists}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Creep Score:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {player.scores.creepScore}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Ward Score:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {player.scores.wardScore}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Total Gold Spent:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {/* Assuming calculateTotalGoldSpent function is defined elsewhere */}
                    {calculateTotalGoldSpent(player, itemsArr)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Items:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    <ul>
                      {player.items.map((item) => {
                        const itemData = items?.find(
                          (i) => i.id === item.itemID
                        );
                        return (
                          <li key={item.itemID}>
                            {itemData ? (
                              <>
                                <Image
                                  src={`https://ddragon.leagueoflegends.com/cdn/14.16.1/img/item/${itemData.image.full}`}
                                  alt={itemData.name}
                                  width={itemData.image.w}
                                  height={itemData.image.h}
                                  className="mb-2"
                                />
                                <span>{itemData.name}</span>
                              </>
                            ) : (
                              <span>Unknown Item ({item.itemID})</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Runes:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {player.runes.keystone.displayName}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Summoner Spells:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {player.summonerSpells.summonerSpellOne.displayName} /{" "}
                    {player.summonerSpells.summonerSpellTwo.displayName}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
      <h2>Event Data</h2>
      {eventData.map((event: GameEvent) => (
        <div key={event.EventID} style={{ marginBottom: "10px" }}>
          <p>
            <strong>Event:</strong> {event.EventName}
          </p>
          <p>
            <strong>Time:</strong> {event.EventTime}
          </p>
          {event.Assisters && event.Assisters.length > 0 && (
            <p>
              <strong>Assisters:</strong> {event.Assisters.join(", ")}
            </p>
          )}
          {event.KillerName && (
            <p>
              <strong>Killer:</strong> {event.KillerName}
            </p>
          )}
          {event.TurretKilled && (
            <p>
              <strong>Turret Killed:</strong> {event.TurretKilled}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default AllPlayers;
