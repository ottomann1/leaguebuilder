export async function getAllChampions(): Promise<DDChampion[] | null> {
  try {
    // Fetch champion data from Data Dragon
    const response = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/14.16.1/data/en_US/champion.json", 
      // { cache: 'force-cache' }
    );

    // Convert response to JSON
    const data = await response.json();

    // Extract champion data from the response
    const champions: DDChampion[] = Object.values(data.data);

    // Return the champions data
    console.log("getAllChampions loaded");
    
    return Object.values(champions);
  } catch (error) {
    console.error("Error fetching champions from Data Dragon:", error);
    return null; // Return null on error
  }
}


export async function getAllItems(): Promise<DDItem[] | null> {
  try {
    // Fetch item data from Data Dragon
    const response = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/14.16.1/data/en_US/item.json",
      //  { cache: 'force-cache' }
    );
    // Convert response to JSON
    const data = await response.json();
    const itemsData: DDItem[] = data.data;
    // Transform the data into an array of items with the id included
    const items: DDItem[] = Object.entries(itemsData).map(([id, item]) => ({
      id: parseInt(id), // Convert the string ID to a number
      ...item, // Spread the rest of the item properties
    })); 
    console.log("getAllItems loaded");

    // Return the items data
    return items;
  } catch (error) {
    console.error("Error fetching items from data dragon:", error);
    return null;
  }
}

