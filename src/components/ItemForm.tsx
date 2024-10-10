// src/components/ItemForm.tsx

import React, { useEffect, useState } from "react";
import { Item } from "../models"; // Adjust path as needed
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ModelInit } from "@aws-amplify/datastore";
import { Box, Button, Input, TextField, Typography } from "@mui/material";
import { itemService } from "../services/ItemService";
import { useAppDispatch } from "../store/hooks";
import { addItem, updateItem } from "../features/inventory/inventorySlice";

interface ItemFormProps {
  selectedItem: Item | null;
  onClear: () => void;
}
// interface ItemFormProps {
//   selectedItem: Item | null;
//   onSubmit: (item: Omit<Item, "id"> | Item) => void;
//   onClear: () => void;
// }
const ItemForm: React.FC<ItemFormProps> = ({ selectedItem, onClear }) => {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
      setQuantity(selectedItem.quantity);
      setImageUrl(selectedItem.thumbnailUrl || "");
      setImagePreview(selectedItem.thumbnailUrl || null);
    } else {
      setName("");
      setQuantity(0);
      setImageUrl("");
      setImagePreview(null);
    }
  }, [selectedItem]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
    setImagePreview(event.target.value);
  };
  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   const newItem: ModelInit<Item> = {
  //     name: name,
  //     quantity: quantity,
  //     thumbnailUrl: imagePreview || imageUrl,
  //   };
  //   try {
  //     if (selectedItem) {
  //       await itemService.updateItem(selectedItem.id, {
  //         name,
  //         quantity,
  //         thumbnailUrl: imagePreview ?? imageUrl,
  //       });
  //       onClear(); // Clear selected item after updating
  //     } else {
  //       await itemService.createItem(new Item(newItem));
  //     }
  //     // Reset the form
  //     setName("");
  //     setQuantity(0);
  //     setImageUrl("");
  //     setImagePreview(null);
  //     setError(null);
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  //   window.location.reload();
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const itemData: ModelInit<Item> = {
      name,
      quantity,
      thumbnailUrl: imagePreview || imageUrl,
    };

    if (selectedItem) {
      dispatch(updateItem(selectedItem));
      onClear();
    } else {
      dispatch(addItem(new Item(itemData)));
    }

    // Reset the form
    setName("");
    setQuantity(0);
    setImageUrl("");
    setImagePreview(null);
    setError(null);
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 4 }}>
      <TextField
        label="Item Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Quantity"
        variant="outlined"
        type="number"
        fullWidth
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Image URL"
        variant="outlined"
        fullWidth
        value={imageUrl}
        onChange={handleUrlChange}
        sx={{ marginBottom: 2 }}
      />
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        Or upload an image:
      </Typography>
      <Input
        type="file"
        onChange={handleImageChange}
        sx={{ display: "none" }}
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button
          variant="outlined"
          component="span"
          startIcon={<AddPhotoAlternateIcon />}
          sx={{ marginBottom: 2 }}
        >
          Upload Image
        </Button>
      </label>
      {imagePreview && (
        <Box sx={{ marginBottom: 2 }}>
          <img
            src={imagePreview}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </Box>
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {" "}
        {selectedItem ? "Update Item" : "Create Item"}
      </Button>
    </Box>
  );
};

export default ItemForm;
