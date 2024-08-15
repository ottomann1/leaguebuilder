"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { getAllChampions, getAllItems } from "@/api/datadragon/api";

// Define the types for the context
type StaticDataContextType = {
  champions: DDChampion[];
  items: DDItem[];
};

// Create the context with default values
const StaticDataContext = createContext<StaticDataContextType>({
  champions: [],
  items: [],
});

// Hook to use the static data context
export const useStaticData = () => useContext(StaticDataContext);

// Provider component to wrap your app and provide the data
export const StaticDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [champions, setChampions] = useState<DDChampion[]>([]);
  const [items, setItems] = useState<DDItem[]>([]);
  console.log("provider loaded")

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedChampions = await getAllChampions();
        const fetchedItems = await getAllItems();
        setChampions(fetchedChampions || []);
        setItems(fetchedItems || []);
        console.log("data fetched");

      } catch (error) {
        console.error("Error fetching data:", error);
        setChampions([]);
        setItems([]);
      }
    }
    fetchData();
  }, []);

  return (
    <StaticDataContext.Provider value={{ champions, items }}>
      {children}
    </StaticDataContext.Provider>
  );
};
