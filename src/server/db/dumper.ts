import { db } from '.';
import { champions, items, viableItems } from './schema';
import { eq, inArray, and } from 'drizzle-orm';

export async function insertMissingChampionsAndItems(ddChampions: DDChampion[], ddItems: DDItem[]) {
  await db.transaction(async (tx) => {
    // Fetch all existing champions and items in one go
    const existingChampions = await tx.select().from(champions);
    const existingItems = await tx.select().from(items);

    // Create a set of existing champion names and item IDs for quick lookup
    const existingChampionNames = new Set(existingChampions.map((champ) => champ.name));
    const existingItemIds = new Set(existingItems.map((item) => item.id));

    // Filter out the champions and items that already exist
    const newChampions = ddChampions.filter((ddChampion) => !existingChampionNames.has(ddChampion.name));
    const newItems = ddItems.filter((ddItem) => !existingItemIds.has(ddItem.id));

    // Insert new champions and items in bulk
    if (newChampions.length > 0) {
      await tx.insert(champions).values(
        newChampions.map((ddChampion) => ({
          name: ddChampion.name,
        }))
      );
      console.log(`Inserted champions: ${newChampions.map((c) => c.name).join(', ')}`);
    } else {
      console.log('No new champions to insert.');
    }

    if (newItems.length > 0) {
      await tx.insert(items).values(
        newItems.map((ddItem) => ({
          id: ddItem.id,
          name: ddItem.name,
        }))
      );
      console.log(`Inserted items: ${newItems.map((i) => i.name).join(', ')}`);
    } else {
      console.log('No new items to insert.');
    }
  });
}

export async function insertViableItemsForChampion(
    championName: string,
    position: string,
    itemNames: string[]
  ) {
    // Remove duplicates from the itemNames array
    const uniqueItemNames = [...new Set(itemNames)];
  
    // Get the champion ID
    const champion = await db
      .select({ id: champions.id })
      .from(champions)
      .where(eq(champions.name, championName))
      .limit(1);
  
    if (!champion.length) {
      throw new Error(`Champion ${championName} not found`);
    }
    const championId = champion[0].id;
  
    // Find all the item IDs that match the item names
    const matchedItems = await db
      .select({ id: items.id, name: items.name })
      .from(items)
      .where(inArray(items.name, uniqueItemNames));
  
    // Insert into viableItems for each item and the given position
    const insertPromises = matchedItems.map(async (item) => {
      const existingViableItem = await db
        .select()
        .from(viableItems)
        .where(
          and(eq(viableItems.championId, championId),
          eq(viableItems.itemId, item.id),
          eq(viableItems.position, position))
        )
        .limit(1);
  
      if (!existingViableItem.length) {
        await db.insert(viableItems).values({
          championId,
          itemId: item.id,
          position,
        });
        console.log(
          `Inserted viable item: ${item.name} for ${championName} in position ${position}`
        );
      } else {
        console.log(
          `Viable item already exists: ${item.name} for ${championName} in position ${position}`
        );
      }
    });
  
    await Promise.all(insertPromises);
  }
