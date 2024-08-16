"use client";

import React, { useEffect, useState } from 'react';
import { useStaticData } from "@/context/StaticDataContext";
import Image from 'next/image';
import { scrapeOPGGItems } from '@/utils/scraper';
import { formatPosition } from '@/utils/utils';

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
  console.log(items)

  // Function to determine if an item is a jungle item
  const isJungleItem = (item:DDItem) => {
    // Adjust this logic based on how jungle items are identified in your data
    return item.tags.includes("Jungle") || ["3706", "3715", "1400", "1401", "1402", "1408", "1412", "1413", "1414", "1416", "1419"].includes(item.id.toString());
  };

  function filterAndSortItems() {
    const inventoryItemNames = currentPlayer!.items.map(item => {
      const itemData = items.find(staticItem => staticItem.id === item.itemID);
      return itemData?.name || '';
    });

    const filteredItems = viableItems
      .filter(itemName => {
        const itemData = items.find(item => item.name === itemName);
        if (!itemData) return false;

        // Exclude jungle items
        if (isJungleItem(itemData)) {
          return false;
        }

        // If any boot is purchased, remove all boots from the viable items list
        if (itemData.tags.includes("Boots") && inventoryItemNames.some(name => items.find(item => item.name === name)?.tags.includes("Boots"))) {
          return false;
        }

        // Remove items already in the player's inventory
        return !inventoryItemNames.includes(itemName);
      })
      .sort((a, b) => {
        const itemA = items.find(item => item.name === a);
        const itemB = items.find(item => item.name === b);
        return (itemA?.gold.total || 0) - (itemB?.gold.total || 0);
      });

    return filteredItems;
  }

  function renderItems() {
    const sortedItems = filterAndSortItems();
    return sortedItems.map((itemName) => {
      const itemData = items.find((item) => item.name === itemName);
      if (!itemData) return null;

      const isPurchasable = currentGold >= itemData.gold.total;

      return (
        <div key={itemData.id} className="flex flex-col items-center py-2 pr-4">
          
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/14.16.1/img/item/${itemData.image.full}`}
            alt={itemData.name}
            width={48}
            height={48}
            className="rounded"
          />
          <div className="pt-2 text-center">
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
    <div className="overflow-y-auto card-body bg-base-100 p-0 pl-4 pt-4 h-[42vh] w-full">
      <div className='flex w-full justify-between'>
        <div className="text-lg font-semibold">
          Viable Items for {championName + " "} {position + " "} <span className='pl-6 text-yellow-500'>Current Gold: {Math.floor(currentGold)}</span>
        </div>
      </div>

      <div className="flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  );
}

export default ItemsCard;
