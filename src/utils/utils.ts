
export function calculateTotalGoldSpent(player: Player, items: DDItem[]): number {
  let totalGoldSpent = 0;
  player.items.forEach((item: Item) => {
    const itemData = items.find((i) => i.id === item.itemID);
    const cost = itemData ? itemData.gold.total : 0;
    totalGoldSpent += cost * item.count;
  });

  return totalGoldSpent;
}

export function displayPlayerItems(player: Player, items: DDItem[]): string {
  return player.items
    .map((item) => {
      const itemData = items.find((i) => i.id === item.itemID);
      const itemName = itemData ? itemData.name : `Unknown Item (${item.itemID})`;
      return `${itemName} (ID: ${item.itemID}, Count: ${item.count})`;
    })
    .join(", ");
}

export function formatTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function estimateTotalGold(player: Player, gameTime: number, eventData: GameEvent[]){
  // Base gold income: 2 gold per second
  const baseGold = gameTime * 2;

  // Initialize gold counters
  let killGold = 0;
  let assistGold = 0;
  let objectiveGold = 0;
  let startingGold = 500;

  // Loop through event data to calculate gold from kills, assists, and objectives
  eventData.forEach(event => {
    if (event.EventName === "ChampionKill" && event.KillerName === player.summonerName) {
      // Add 300 gold for each kill
      killGold += 300;
    }

    if (event.EventName === "ChampionKill" && event.Assisters && event.Assisters.includes(player.summonerName)) {
      // Split 150 gold among assisters
      assistGold += 150 / event.Assisters.length;
    }

    if (event.EventName === "TurretKilled" && event.KillerName === player.summonerName) {
      // Estimate 150 gold for turret kills
      objectiveGold += 150;
    }
  });

  // Total gold earned
  const totalGoldEarned = baseGold + killGold + assistGold + objectiveGold + startingGold;
  return Math.floor(totalGoldEarned)
}

export function estimateCurrentGold(player: Player, gameTime: number, eventData: GameEvent[], items: DDItem[]): number {
  // Estimate total gold earned
  const totalGoldEarned = estimateTotalGold(player, gameTime, eventData);

  // Calculate total gold spent on items
  const totalGoldSpent = calculateTotalGoldSpent(player, items);

  // Estimate current gold by subtracting the spent gold from the earned gold
  const currentGoldEstimate = totalGoldEarned - totalGoldSpent;

  return currentGoldEstimate;
}

export function formatPosition(position: string): string {
  switch (position.toUpperCase()) {
    case "UTILITY":
      return "support";
    case "BOTTOM":
      return "adc";
    case "MIDDLE":
      return "mid";
    case "JUNGLE":
      return "jungle";
    case "TOP":
      return "top";
    default:
      return position.toLowerCase();
  }
}
