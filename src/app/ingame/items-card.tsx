"use client";

import React from 'react';
import { useStaticData } from "@/context/StaticDataContext";
import Image from 'next/image';

interface ItemsCardProps {
  championName: string;
  position: string;
  gameTime: number;
  eventData: GameEvent[];
  currentGold: number;
  viableItems: string[];
}

export function ItemsCard({ championName, position, gameTime, eventData, currentGold, viableItems }: ItemsCardProps) {
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
        <div key={itemData.id} className="flex items-center my-2">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/14.16.1/img/item/${itemData.image.full}`}
            alt={itemData.name}
            width={48}
            height={48}
          />
          <div className="ml-4">
            <div className="font-bold">{itemData.name}</div>
            <div className={`text-sm ${isPurchasable ? 'text-green-500' : 'text-red-500'}`}>
              {isPurchasable ? 'Purchasable' : 'Not enough gold'}
            </div>
            <div className="text-xs">Cost: {itemData.gold.total} gold</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="card shadow-lg compact bg-base-100 p-4">
      <h3 className="text-lg font-semibold">Viable Items for {championName} ({position})</h3>
      <div className="mt-4">
        {renderItems()}
      </div>
    </div>
  );
}

export default ItemsCard;
