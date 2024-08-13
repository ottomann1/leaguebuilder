const itemCosts: { [key: number]: number } = {
  1001: 300, // Example item: Boots
  2003: 50, // Example item: Health Potion
  // Add more item costs here based on item IDs
};

export function calculateTotalGoldSpent(player: Player): number {
  let totalGoldSpent = 0;

  player.items.forEach((item: Item) => {
    const cost = itemCosts[item.itemID] || 0;
    totalGoldSpent += cost * item.count;
  });

  return totalGoldSpent;
}

export function displayPlayerItems(player: Player): string {
  return player.items
    .map((item) => `Item ID: ${item.itemID}, Count: ${item.count}`)
    .join(", ");
}
