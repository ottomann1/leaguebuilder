import { relations } from "drizzle-orm";
import {
  serial,
  text,
  integer,
  numeric,
  pgTable,
  primaryKey,
} from "drizzle-orm/pg-core";

// Define the items table schema
export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  cost: integer("cost").notNull(),
  goldEfficiency: numeric("gold_efficiency").notNull(),
});

// Define the champions table schema
export const champions = pgTable("champions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

// Define the viable_items join table schema for the many-to-many relationship
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
  }),
);

// Establish relations for the items table
export const itemsRelations = relations(items, ({ many }) => ({
  viableItems: many(viableItems),
}));

// Establish relations for the champions table
export const championsRelations = relations(champions, ({ many }) => ({
  viableItems: many(viableItems),
}));

// Establish relations for the viable_items table
export const viableItemsRelations = relations(viableItems, ({ one }) => ({
  champion: one(champions, {
    fields: [viableItems.championId],
    references: [champions.id],
  }),
  item: one(items, {
    fields: [viableItems.itemId],
    references: [items.id],
  }),
}));
