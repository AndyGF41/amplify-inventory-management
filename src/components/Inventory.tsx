import React, { useEffect, useState } from "react";

import ItemForm from "./ItemForm";
import ItemList from "./ItemList";
import { Item } from "../models";
import { Container, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
} from "../features/inventory/inventorySlice";

const Inventory: React.FC = () => {
  // const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  // const [items, setItems] = useState<Item[]>([]);

  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.inventory);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAddItem = (newItem: Omit<Item, "id">) => {
    dispatch(addItem(newItem));
  };

  const handleUpdateItem = (updatedItem: Item) => {
    dispatch(updateItem(updatedItem));
    setSelectedItem(null);
  };

  const handleDeleteItem = (item: Item) => {
    dispatch(deleteItem(item));
  };

  const handleEditItem = (item: Item) => {
    setSelectedItem(item);
  };

  const clearSelectedItem = () => {
    setSelectedItem(null);
  };

  if (loading) {
    console.log("Loading is true:", loading);
    return <div>Loading...</div>;
  } else if (error) {
    console.log("Error is:", error);
    return <div>Error: {error}</div>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Inventory Management
      </Typography>
      <ItemForm selectedItem={selectedItem} onClear={clearSelectedItem} />
      <ItemList onEdit={handleEditItem} onDelete={handleDeleteItem} />
    </Container>
  );
};

// Handler Functions
//   const handleEditItem = (item: Item) => {
//     setSelectedItem(item);
//   };
//   const clearSelectedItem = () => {
//     setSelectedItem(null);
//   };
//   const handleDelete = async (item: Item) => {
//     try {
//       await itemService.deleteItem(item); // Pass the full item for deletion
//       fetchItems(); // Refresh the items after deletion
//       window.location.reload();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   };

//   const fetchItems = async () => {
//     const allItems = await DataStore.query(Item);
//     setItems(allItems);
//   };

//   return (
//     <Container maxWidth="md" style={{ marginTop: "20px" }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Inventory Management
//       </Typography>
//       <ItemForm selectedItem={selectedItem} onClear={clearSelectedItem} />{" "}
//       {/* Form for creating items */}
//       <ItemList onEdit={handleEditItem} onDelete={handleDelete} />{" "}
//       {/* The list displaying the items */}
//     </Container>
//   );
// };

export default Inventory;
