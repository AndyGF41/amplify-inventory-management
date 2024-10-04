// src/components/ItemForm.tsx

import React, { useEffect, useState } from "react";
import { Item } from "../models"; // Adjust path as needed
import { itemService } from "../services/ItemService";
import { v4 as uuidv4 } from "uuid";
import { ModelInit } from "@aws-amplify/datastore";

interface ItemFormProps {
  selectedItem: Item | null;
  onClear: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ selectedItem, onClear }) => {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
      setQuantity(selectedItem.quantity);
    } else {
      setName("");
      setQuantity(0);
    }
  }, [selectedItem]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newItem: ModelInit<Item> = {
      name: name,
      quantity: quantity,
    };
    try {
      if (selectedItem) {
        await itemService.updateItem(selectedItem.id, { name, quantity });
        onClear(); // Clear selected item after updating
      } else {
        await itemService.createItem(new Item(newItem));
      }
      // Reset the form
      setName("");
      setQuantity(0);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Item</h2>
      {error && <div>Error: {error}</div>}
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </label>
      </div>
      <button type="submit">
        {" "}
        {selectedItem ? "Update Item" : "Create Item"}
      </button>
    </form>
  );
};

export default ItemForm;
