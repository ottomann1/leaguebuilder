import React from 'react';
import { scrapeOPGGItems } from '@/utils/scraper';
import ItemsCard from './items-card';
import { formatPosition } from '@/utils/utils';

interface ItemsCardWrapperProps {
  gameTime: number;
  eventData: GameEvent[];
  playerList: Player[];
  playerData: ActivePlayer;
}

export default async function ItemsCardWrapper({
  gameTime,
  eventData,
  playerList,
  playerData,
}: ItemsCardWrapperProps) {
  const currentPlayer = playerList.find(player => player.summonerName === playerData.summonerName);

  if (!currentPlayer) {
    throw new Error("Current player not found in player list.");
  }

  const championName = currentPlayer.championName;
  const position = formatPosition(currentPlayer.position);

  // Fetch viable items from OP.GG
  const viableItems = await scrapeOPGGItems(championName, position);

  return (
    <ItemsCard
      gameTime={gameTime}
      eventData={eventData}
      playerList={playerList}
      playerData={playerData}
    />
  );
}
