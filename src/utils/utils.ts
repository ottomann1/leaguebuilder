
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