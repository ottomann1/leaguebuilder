"use client"

import React, { useEffect } from "react";
import { useStaticData } from "@/context/StaticDataContext";
import Image from "next/image";
import { calculateTotalGoldSpent, estimateCurrentGold, estimateTotalGold, formatTime } from "@/utils/utils";
import { revalidate } from "@/actions/actions";

interface AllPlayersProps {
  playerList: Player[];
  eventData: GameEvent[];
  gameTime:number
}

async function runRevalidate(){
  await revalidate()
}

export function PlayerCard({ playerList, eventData, gameTime }: AllPlayersProps) {
  const staticData = useStaticData();
  const champions = staticData.champions;
  const items = staticData.items;

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await runRevalidate();
    }, 1000); // Refresh every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  if (!champions) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (!items) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }


  const team1 = playerList.filter((player) => player.team === "ORDER");
  const team2 = playerList.filter((player) => player.team === "CHAOS");
  const renderPlayerRow = (player: Player) => {
    const champion = champions?.find((champ) => champ.name === player.championName);
    return (
      <tr className="hover h-[10vh]" key={player.summonerName}>
        <td className="p-0">
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
        <td className="p-0 text-center ">{player.level}</td>
        <td className="p-0 text-center">
          {player.scores.kills}/{player.scores.deaths}/{player.scores.assists}
        </td>
        <td className="p-0 text-center">{player.scores.creepScore}</td>
        <td className="p-0">
          <div className="stats shadow">
            <div className="stat pl-3 pr-2">
              <div className="stat-title text-xs">Item Value</div>
              <div className="stat-value text-xs">
                {calculateTotalGoldSpent(player, items)}
              </div>
            </div>
            <div className="stat px-2">
              <div className="stat-title text-xs">Total Gold</div>
              <div className="stat-value text-xs">
                {estimateTotalGold(player, gameTime, eventData)}
              </div>
            </div>
            <div className="stat pl-2 pr-3">
              <div className="stat-title text-xs">Current Gold</div>
              <div className="stat-value text-xs">
                {estimateCurrentGold(player, gameTime, eventData, items)}
              </div>
            </div>
          </div>
        </td>
        <td className="p-0 pr-1">
          <div className="flex gap-1">
            {player.items.map((item) => {
              const itemData = items.find((i) => i.id === item.itemID);
              return (
                itemData && (
                  <div
                    key={item.itemID}
                    className="tooltip tooltip-left"
                    data-tip={`${itemData.name} - ${itemData.plaintext}. Price: ${itemData.gold.total}
                    `}
                    // ${JSON.stringify(itemData.stats)} TODO ADD THIS TO STATS BUT ALSO CREATE A FUNCTION TO FORMAT THE WEIRD STAT NAMES
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
      <div className="card-body p-0 pt-2 h-full bg-base-100">
        <div className="flex flex-row p-2">
        <h2 className="card-title text-center pl-1 pr-1">Scoreboard{" "}</h2>
              <div className="text-lg font-semibold">{" "} - Current Game Time: {formatTime(gameTime)}
        </div>

        </div>
        <div className="flex justify-between">
          <div className="w-full">
            <div className="overflow-x-visible">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="text-center">
                    <th className="py-0">Champion</th>
                    <th className="py-0">Level</th>
                    <th className="py-0">K/D/A</th>
                    <th className="py-0">CS</th>
                    <th className="py-0">Gold (estimated)</th>
                    <th className="py-0">Items</th>
                  </tr>
                </thead>
                <tbody>{team1.map(renderPlayerRow)}</tbody>
              </table>
            </div>
          </div>

          {/* Team 2 Table */}
          <div className="w-full">
            <div className="overflow-x-visible">
              <table className="table table-zebra w-full">
                <thead>
                <tr className="text-center">
                    <th className="py-0">Champion</th>
                    <th className="py-0">Level</th>
                    <th className="py-0">K/D/A</th>
                    <th className="py-0">CS</th>
                    <th className="py-0">Gold</th>
                    <th className="py-0">Items</th>
                  </tr>
                </thead>
                <tbody>{team2.map(renderPlayerRow)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}

export default PlayerCard;
