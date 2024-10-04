// src/components/ItemList.tsx

import React, { useEffect, useState } from "react";
import { Item } from "../models"; // Adjust path as needed
import { itemService } from "../services/ItemService";

interface ItemListProps {
  onEdit: (item: Item) => void;
  onDelete: (id: Item) => void; // New prop for deletion
}
const ItemList: React.FC<ItemListProps> = ({ onEdit, onDelete }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const fetchedItems = await itemService.getAllItems();
        setItems(fetchedItems);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadItems();
  }, []);

  const handleEditClick = (item: Item) => {
    onEdit(item);
  };
  const handleDeleteClick = (item: Item) => {
    onDelete(item);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
            <button onClick={() => handleEditClick(item)}>Edit</button>
            <button onClick={() => handleDeleteClick(item)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
