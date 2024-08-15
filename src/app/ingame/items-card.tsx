"use client";

import React, { useEffect, useState } from 'react';
import { useStaticData } from "@/context/StaticDataContext";
import Image from 'next/image';
import { scrapeOPGGItems } from '@/utils/scraper';
import { formatPosition } from '@/utils/utils';
import { getSummoner } from '@/api/leagueconnect/api';

interface ItemsCardProps {
  gameTime: number;
  eventData: GameEvent[];
  playerList: Player[];
  playerData: ActivePlayer;
}

export function ItemsCard({ gameTime, eventData, playerList, playerData }: ItemsCardProps) {
  const staticData = useStaticData();
  const items = staticData.items;
  const [viableItems, setViableItems] = useState<string[]>([]);

  const currentPlayer = playerList.find(player => player.summonerName === playerData.summonerName);

  if (!currentPlayer) {
    throw new Error("Current player not found in player list.");
  }

  // Get the champion name and formatted position
  const championName = currentPlayer.championName;
  const position = formatPosition(currentPlayer.position);
  const currentGold = playerData.currentGold;

  useEffect(() => {
    async function fetchItems() {
      const items = await scrapeOPGGItems(championName, position);
      setViableItems(items);
    }
    fetchItems();
  }, [championName, position]);

  if (!items) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  function renderItems() {
    return viableItems.map((itemName) => {
      const itemData = items.find((item) => item.name === itemName);
      if (!itemData) return null;

      const isPurchasable = currentGold >= itemData.gold.total;

      return (
        <div key={itemData.id} className="flex flex-col items-center my-2 mr-4">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/14.16.1/img/item/${itemData.image.full}`}
            alt={itemData.name}
            width={48}
            height={48}
            className="rounded"
          />
          <div className="mt-2 text-center">
            <div className="font-bold text-sm">{itemData.name}</div>
            <div className={`text-xs ${isPurchasable ? 'text-green-500' : 'text-red-500'}`}>
              {isPurchasable ? 'Purchasable' : 'Not enough gold'}
            </div>
            <div className="text-xs">Cost: {itemData.gold.total} gold</div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="card shadow-lg compact bg-base-100 p-6 w-full">
      <h3 className="text-lg font-semibold mb-4">
        Viable Items for {championName} {position}
      </h3>
      <div className="flex justify-between items-center mb-6">

        <div className="text-lg font-semibold">
          Current Game Time: {new Date(gameTime * 1000).toISOString().substr(11, 8)}
        </div>
      </div>
      <div className="flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  );
}

export default ItemsCard;
