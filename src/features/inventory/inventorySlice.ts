import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Item } from "../../models";
import { itemService } from "../../services/ItemService";
import { RootState } from "../../store/store";

interface InventoryState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: InventoryState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchItems = createAsyncThunk<
  Item[],
  void,
  {
    state: RootState;
  }
>("inventory/fetchItems", async () => {
  return await itemService.getAllItems();
});

export const addItem = createAsyncThunk(
  "inventory/addItem",
  async (newItem: Omit<Item, "id">) => {
    return await itemService.createItem(newItem);
  }
);

export const updateItem = createAsyncThunk(
  "inventory/updateItem",
  async (updatedItem: Item) => {
    return await itemService.updateItem(updatedItem.id, updatedItem);
  }
);

export const deleteItem = createAsyncThunk(
  "inventory/deleteItem",
  async (item: Item) => {
    await itemService.deleteItem(item);
    return item.id;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch items";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});
export const { reset } = inventorySlice.actions;

export default inventorySlice.reducer;
