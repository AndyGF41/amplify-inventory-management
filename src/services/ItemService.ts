import { DataStore } from "@aws-amplify/datastore";
import { Item } from "../models/index"; // Your Amplify model definition for Item

class ItemService {
  // Create Item
  async createItem(newItem: Omit<Item, "id">): Promise<Item> {
    try {
      const item = new Item({
        name: newItem.name,
        quantity: newItem.quantity,
        thumbnailUrl: newItem.thumbnailUrl,
        description: newItem.description,
        price: newItem.price,
        cost: newItem.cost,
        location: newItem.location,
        attributes: newItem.attributes,
        categorySet: newItem.categorySet,
        // Do NOT include createdAt or updatedAt here
      });
      const createdItem = await DataStore.save(item);
      return createdItem;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  }

  // Read all Items
  async getAllItems(): Promise<Item[]> {
    try {
      const items = await DataStore.query(Item);
      return items;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  }

  // Update Item
  async updateItem(id: string, updatedFields: Partial<Item>): Promise<Item> {
    try {
      const originalItem = await DataStore.query(Item, id);
      if (!originalItem) throw new Error("Item not found");

      const updatedItem = await DataStore.save(
        Item.copyOf(originalItem, (updated: any) => {
          Object.assign(updated, updatedFields);
        })
      );
      return updatedItem;
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  }

  // Delete Item
  async deleteItem(item: Item): Promise<void> {
    try {
      await DataStore.delete(item);
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }
}

export const itemService = new ItemService();
