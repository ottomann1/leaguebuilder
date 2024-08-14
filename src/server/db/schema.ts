import { InferSelectModel, relations } from "drizzle-orm";
import {
  serial,
  text,
  integer,
  numeric,
  pgTable,
  primaryKey,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

// Define the items table schema
export const items = pgTable("items", {
  id: integer("id").primaryKey(), // The item ID
  name: text("name").notNull(),
  description: text("description"),
  plaintext: text("plaintext"),
  base_cost: integer("base_cost").notNull(), // Base cost of the item
  total_cost: integer("total_cost").notNull(), // Total cost of the item
  sell_cost: integer("sell_cost").notNull(), // Sell cost of the item
  purchasable: boolean("purchasable").notNull(), // Whether the item is purchasable
  tags: text("tags").array().notNull(), // Array of tags (e.g., Damage, CriticalStrike)
  maps: jsonb("maps").notNull(), // JSONB field to store the maps info
  stats: jsonb("stats").notNull(), // JSONB field to store the stats
  depth: integer("depth").notNull(), // Depth of the item in the item tree
  from_items: integer("from_items").array(), // IDs of the component items
  image_full: text("image_full").notNull(), // Image file name (e.g., "3508.png")
  image_sprite: text("image_sprite").notNull(), // Image sprite name (e.g., "item1.png")
  image_group: text("image_group").notNull(), // Image group (e.g., "item")
  image_x: integer("image_x").notNull(), // X coordinate in the sprite
  image_y: integer("image_y").notNull(), // Y coordinate in the sprite
  image_w: integer("image_w").notNull(), // Width of the image in the sprite
  image_h: integer("image_h").notNull(), // Height of the image in the sprite
});
export type ItemSelect = InferSelectModel<typeof items>;
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
