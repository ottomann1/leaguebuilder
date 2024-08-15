"use server"
import { insertViableItemsForChampion } from '@/server/db/dumper';
import { load } from 'cheerio';

export async function scrapeOPGGItems(xchampionName:string, position:string):Promise<string[]> {
  const championName = xchampionName.toLowerCase().replace(/[^a-z]/g, '');
  try {
    const url = `https://www.op.gg/champions/${championName}/items/${position}?type=ranked`;
    const response = await fetch(url);
    const html = await response.text();

    const $ = load(html);

    const items:string[] = [];
    
    // Adjust the selector to target the table with the class "css-1q0r7l3 e1h3twa80"
    $('.css-1q0r7l3.e1h3twa80 img').each((index, element) => {
      const itemName = $(element).attr('alt');
      if (itemName) {
        items.push(itemName);
      }
    });
    const uniqueViableItems = Array.from(new Set(items));
    insertViableItemsForChampion(xchampionName, position, uniqueViableItems)
    return uniqueViableItems;
  } catch (error) {
    console.error('Error scraping OP.GG:', error);
    return [];
  }
}