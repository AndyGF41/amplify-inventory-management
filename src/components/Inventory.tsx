import React, { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import { listItems } from "../graphql/queries";
import { createItem } from "../graphql/mutations";

interface Item {
  id: number;
  name: string;
  quantity: number;
}
const client = generateClient();

const Inventory: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const itemData: any = await client.graphql(graphqlOperation(listItems));
      console.log(itemData.data.listItems.items);
      const itemsList = itemData.data.listItems.items;
      setItems(itemsList);
    } catch (error) {
      console.log("Error fetching items", error);
    }
  };

  const addItem = async () => {
    const newItem = { name: itemName, quantity: itemQuantity };
    try {
      const result: any = await client.graphql(
        graphqlOperation(createItem, { input: newItem })
      );
      const createdItem = result.data.createItem;

      setItems([...items, createdItem]);
      setItemName("");
      setItemQuantity(0);
    } catch (error) {
      console.log("Error adding item", error);
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2>Inventory</h2>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={itemQuantity}
        onChange={(e) => setItemQuantity(Number(e.target.value))}
      />
      <button onClick={addItem}>Add Item</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
