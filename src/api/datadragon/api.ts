export async function getAllChampions() {
  try {
    // Fetch champion data from Data Dragon
    const response = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/14.16.1/data/en_US/champion.json",
    );

    // Convert response to JSON
    const data = await response.json();

    // Extract champion data from the response
    const champions: DDChampion[] = data.data;

    // Return the champions data
    return champions;
  } catch (error) {
    console.error("Error fetching champions from data dragon:", error);
    return null;
  }
}

export async function getAllItems() {
  try {
    // Fetch item data from Data Dragon
    const response = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/14.16.1/data/en_US/item.json",
    );

    // Convert response to JSON
    const data = await response.json();

    // Extract item data from the response
    const items: DDItem = data.data;

    // Return the items data
    return items;
  } catch (error) {
    console.error("Error fetching items from data dragon:", error);
    return null;
  }
}
