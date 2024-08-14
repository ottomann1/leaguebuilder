"use client";

import React from 'react';
import { useStaticData } from "@/context/StaticDataContext";
import Image from 'next/image';

interface ItemsCardProps {
  championName: string;
  summonerName: string;
  position: string;
  gameTime: number;
  eventData: GameEvent[];
  currentGold: number;
  viableItems: string[];
}

export function ItemsCard({ championName, summonerName, position, gameTime, eventData, currentGold, viableItems }: ItemsCardProps) {
  const staticData = useStaticData();
  const items = staticData.items;

  // Remove duplicates from viableItems
  const uniqueViableItems = Array.from(new Set(viableItems));

  if (!items) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  function renderItems() {
    return uniqueViableItems.map((itemName) => {
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
          You are now ingame, {championName}
        </div>
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
