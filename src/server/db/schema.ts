import { serial, text, pgTable, integer, primaryKey } from "drizzle-orm/pg-core";

export const champions = pgTable("champions", {
  id: serial("id").primaryKey(), // The champion ID
  name: text("name").notNull(), // The champion name
});

export const items = pgTable("items", {
  id: integer("id").primaryKey(), // The item ID
  name: text("name").notNull(), // The item name
});

export const viableItems = pgTable(
  "viable_items",
  {
    championId: integer("champion_id")
      .notNull()
      .references(() => champions.id, { onDelete: "cascade" }),
    itemId: integer("item_id")
      .notNull()
      .references(() => items.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey(t.championId, t.itemId),
  })
);