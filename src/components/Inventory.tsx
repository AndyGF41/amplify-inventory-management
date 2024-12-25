import React, { useEffect, useState } from "react";

import ItemForm from "./ItemForm";
import ItemList from "./ItemList";
import { Item } from "../models";
import { Container, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchItems, deleteItem } from "../features/inventory/inventorySlice";

const Inventory: React.FC = () => {
  // const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  // const [items, setItems] = useState<Item[]>([]);
  const predefinedCategories = [
    "Electronics",
    "Smartphones",
    "Laptops",
    "Appliances",
    "Accessories",
  ];

  const dispatch = useAppDispatch();
  const { loading, error, selectedItem } = useAppSelector(
    (state) => state.inventory
  );
  // const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [itemToBeEdited, setItemToBeEdited] = useState<Item | null>(null);
  const [categories, setCategories] = useState(predefinedCategories); // State for categories

  useEffect(() => {
    dispatch(fetchItems());
    setItemToBeEdited(selectedItem);
  }, [dispatch]);

  // const handleAddItem = (newItem: Omit<Item, "id">) => {
  //   dispatch(addItem(newItem));
  // };

  // const handleUpdateItem = (updatedItem: Item) => {
  //   dispatch(updateItem(updatedItem));
  //   setSelectedItem(null);
  // };

  const handleDeleteItem = (item: Item) => {
    dispatch(deleteItem(item));
  };

  const handleEditItem = (item: Item) => {
    // setSelectedItem(item);
    setItemToBeEdited(item);
  };

  const clearSelectedItem = () => {
    setItemToBeEdited(null);
    // setSelectedItem(null);
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
      <ItemForm
        // selectedItem={itemToBeEdited}
        categories={categories}
        onClear={clearSelectedItem}
      />
      {/* <ItemList onEdit={handleEditItem} onDelete={handleDeleteItem} /> */}
    </Container>
  );
};

export default Inventory;
