"use client"

import React from "react";
import { useStaticData } from "@/context/StaticDataContext";
import Image from "next/image";
import { calculateTotalGoldSpent, estimateCurrentGold, estimateTotalGold, formatTime } from "@/utils/utils";

interface AllPlayersProps {
  playerList: Player[];
  eventData: GameEvent[];
  gameTime:number
}

export function PlayerCard({ playerList, eventData, gameTime }: AllPlayersProps) {
  const staticData = useStaticData();
  const champions = staticData.champions;
  const items = staticData.items;

  if (!champions || !items) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  console.log(playerList)

  const team1 = playerList.filter((player) => player.team === "ORDER");
  const team2 = playerList.filter((player) => player.team === "CHAOS");
  const renderPlayerRow = (player: Player) => {
    const champion = champions?.find((champ) => champ.id === player.championName);

    return (
      <tr className="hover" key={player.summonerName}>
        <td>
          {champion && (
            <div className="flex items-center">
              <div className="avatar">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/14.16.1/img/champion/${champion.image.full}`}
                  alt={champion.name}
                  width={64}
                  height={64}
                  className="mr-2"
                />
              </div>
              <label className="swap">
                <input type="checkbox" />
                <div className="swap-on">
                  <div className="font-bold">{champion.name}</div>
                  <div className="text-sm opacity-50">{champion.title}</div>
                </div>
                <div className="swap-off">
                  <div className="font-bold">{champion.name}</div>
                  <div className="text-sm opacity-50">{player.summonerName}</div>
                </div>
              </label>
            </div>
          )}
        </td>
        <td>{player.level}</td>
        <td>
          {player.scores.kills}/{player.scores.deaths}/{player.scores.assists}
        </td>
        <td>{player.scores.creepScore}</td>
        <td p-0>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title text-xs">Item Value</div>
              <div className="stat-value text-xs">
                {calculateTotalGoldSpent(player, items)}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-xs">Total Gold</div>
              <div className="stat-value text-xs">
                {estimateTotalGold(player, gameTime, eventData)}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-xs">Current Gold</div>
              <div className="stat-value text-xs">
                {estimateCurrentGold(player, gameTime, eventData, items)}
              </div>
            </div>
          </div>
        </td>
        <td className="p-0 pr-4">
          <div className="flex gap-2">
            {player.items.map((item) => {
              const itemData = items.find((i) => i.id === item.itemID);
              return (
                itemData && (
                  <div
                    key={item.itemID}
                    className="tooltip"
                    data-tip={`${itemData.name} - ${itemData.plaintext}. Price: ${itemData.gold.total} stats: ${JSON.stringify(
                      itemData.stats
                    )}`}

                  >
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/14.16.1/img/item/${itemData.image.full}`}
                      alt={itemData.name}
                      width={48}
                      height={48}
                      className="tooltip"
                    />
                  </div>
                )
              );
            })}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body">
        <h2 className="card-title text-center">Scoreboard</h2>

        <div className="flex justify-between">
          {/* Team 1 Table */}
          <div className="w-full">
            <h3 className="text-center">Team 1</h3>
            <div className="overflow-x-visible">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="text-center">
                    <th>Champion</th>
                    <th>Level</th>
                    <th>K/D/A</th>
                    <th>CS</th>
                    <th>Gold</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>{team1.map(renderPlayerRow)}</tbody>
              </table>
            </div>
          </div>

          {/* Team 2 Table */}
          <div className="w-full">
            <h3 className="text-center">Team 2</h3>
            <div className="overflow-x-visible">
              <table className="table table-zebra w-full">
                <thead>
                <tr className="text-center">
                    <th>Champion</th>
                    <th>Level</th>
                    <th>K/D/A</th>
                    <th>CS</th>
                    <th>Gold</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>{team2.map(renderPlayerRow)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;