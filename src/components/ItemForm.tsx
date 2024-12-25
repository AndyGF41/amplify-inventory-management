// src/components/ItemForm.tsx

import React, { useEffect, useState } from "react";
import { Item } from "../models"; // Adjust path as needed
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ModelInit } from "@aws-amplify/datastore";
import {
  Box,
  Button,
  Input,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addItem, updateItem } from "../features/inventory/inventorySlice";

interface ItemFormProps {
  // selectedItem: Item | null;
  categories: string[]; // Predefined list of categories
  onClear: () => void;
}
const categoryAttributesMap: Record<string, string[]> = {
  Electronics: ["Brand", "Warranty", "Power Source"],
  Smartphones: ["Brand", "Screen Size", "Battery Capacity"],
  Laptops: ["Brand", "RAM", "Processor", "Storage"],
  Appliances: ["Brand", "Energy Efficiency"],
  Accessories: ["Brand", "Color", "Material"],
  Clothing: ["Brand", "Size", "Material"],
};
// interface ItemData {
//   id?: string;
//   name: string;
//   description: string;
//   price: number;
//   categorySet: string[];
//   location: string;
//   attributes?: string | null;
//   quantity: number;
//   thumbnailUrl: string;
// }

const ItemForm: React.FC<ItemFormProps> = ({
  // selectedItem,
  categories,
  onClear,
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(categories)
  );
  // const [attributes, setAttributes] = useState<string>("{}"); // Assuming JSON string
  const [attributes, setAttributes] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState<number>(0);
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [dynamicAttributes, setDynamicAttributes] = useState<
    Record<string, string>
  >({});

  const dispatch = useAppDispatch();
  // const [itemData, setItemData] = useState<ItemData>(
  //   selectedItem || {
  //     name: "",
  //     description: "",
  //     price: 0,
  //     categorySet: [],
  //     location: "",
  //     quantity: 1,
  //     thumbnailUrl: "",
  //   }
  // );
  const [error, setError] = useState<string | null>(null);
  // Update available attributes whenever the categorySet changes

  const { selectedItem } = useAppSelector((state) => state.inventory);

  useEffect(() => {
    console.log("selected item: ", selectedItem);
    if (selectedItem) {
      // setName(selectedItem.name);
      // console.log("setting quantity");
      // setQuantity(selectedItem.quantity);
      // console.log("QUANTITY selected item", selectedItem.quantity);
      // setImageUrl(selectedItem.thumbnailUrl || "");
      // setImagePreview(selectedItem.thumbnailUrl || null);
      setName(selectedItem.name);
      setDescription(selectedItem.description);
      setPrice(selectedItem.price);
      setSelectedCategories(new Set(selectedItem.categorySet));
      setLocation(selectedItem.location);
      setQuantity(selectedItem.quantity);
      const parsedAttributes = parseAttributesString(selectedItem.attributes);
      setAttributes(parsedAttributes);
      setImageUrl(selectedItem.thumbnailUrl || "");
      setImagePreview(selectedItem.thumbnailUrl || null);
      // console.log("attributes selectedObject: ", selectedItem.attributes);
      // console.log("attributes object: ", JSON.parse(attributes));
    } else {
      resetForm();
    }
  }, [selectedItem]);

  function parseAttributesString(
    attributesString: string | Record<string, string> | null | undefined
  ): Record<string, string> {
    // If it's already an object or null/undefined, return as is or an empty object
    if (typeof attributesString !== "string") {
      return attributesString || {};
    }

    // If it's an empty string, return an empty object
    if (attributesString.trim() === "") {
      return {};
    }

    try {
      // Try parsing as JSON first
      return JSON.parse(attributesString);
    } catch {
      // If JSON parsing fails, use the custom parsing logic
      const trimmed = attributesString.trim().replace(/^{|}$/g, "");
      const pairs = trimmed.split(", ");

      return pairs.reduce((acc, pair) => {
        const [key, value] = pair.split(": ");
        acc[key] = value.replace(/^'|'$/g, "");
        return acc;
      }, {} as Record<string, string>);
    }
  }

  useEffect(() => {
    const newAttributes: Record<string, string> = {};
    selectedCategories.forEach((category) => {
      const attributes = categoryAttributesMap[category] || [];
      attributes.forEach((attr) => {
        if (!newAttributes[attr]) {
          newAttributes[attr] = "";
        }
      });
    });
    setDynamicAttributes(newAttributes);
  }, [selectedCategories]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setSelectedCategories(new Set());
    setLocation("");
    setQuantity(0);
    setAttributes({});
    setImageUrl("");
    setImagePreview(null);
    setError(null);
  };
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setItemData({
  //     ...itemData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = new Set(prevCategories);
      if (newCategories.has(category)) {
        newCategories.delete(category);
      } else {
        newCategories.add(category);
      }
      return newCategories;
    });
  };
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
      description,
      price,
      categorySet: Array.from(selectedCategories),
      location,
      cost,
      quantity,
      attributes: JSON.stringify(attributes),
      thumbnailUrl: imagePreview ?? imageUrl,
    };
    console.log("dynamicAttributes", dynamicAttributes);
    if (selectedItem) {
      // console.log("itemData", JSON.parse(itemData.attributes!));
      const { updatedAt, createdAt, ...updatableData } = selectedItem;
      dispatch(updateItem({ ...updatableData, ...itemData }));
      // console.log("selecteditemData", JSON.parse(selectedItem.attributes!));
      // dispatch(updateItem({ ...selectedItem, ...itemData }));
      onClear();
    } else {
      dispatch(addItem(new Item(itemData)));
    }

    // Reset the form
    resetForm();
    setError(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 4 }}>
      <TextField
        label="Item Name"
        variant="outlined"
        // name="name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Quantity"
        variant="outlined"
        // name="quantity"
        type="number"
        fullWidth
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Selling Price"
        variant="outlined"
        // name="quantity"
        type="number"
        fullWidth
        value={sellingPrice}
        onChange={(e) => setSellingPrice(parseInt(e.target.value))}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Cost"
        variant="outlined"
        // name="quantity"
        type="number"
        fullWidth
        value={cost}
        onChange={(e) => setCost(parseInt(e.target.value))}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Image URL"
        variant="outlined"
        fullWidth
        // name="thumbnailUrl"
        value={imageUrl}
        onChange={handleUrlChange}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.has(category)}
                onChange={() => handleCategoryChange(category)}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>
      <Box sx={{ marginBottom: 2 }}>
        {Object.keys(dynamicAttributes).map((attr) => {
          // const parsedAttributes = JSON.parse(attributes);
          return (
            <TextField
              key={attr}
              label={attr}
              variant="outlined"
              fullWidth
              value={attributes[attr] || ""}
              onChange={(e) => {
                setDynamicAttributes((prev) => ({
                  ...prev,
                  [attr]: e.target.value,
                }));
                setAttributes((prev) => ({
                  ...prev,
                  [attr]: e.target.value,
                }));
              }}
              sx={{ marginBottom: 2 }}
            />
          );
        })}
      </Box>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {" "}
        {selectedItem ? "Update Item" : "Create Item"}
      </Button>
    </Box>
  );
};

export default ItemForm;
