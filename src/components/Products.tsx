import { useEffect, useState } from "react";
import { Item } from "../models";
import ItemList from "./ItemList";
import {
  fetchItems,
  deleteItem,
  setSelectedItem,
} from "../features/inventory/inventorySlice";
import { useAppDispatch } from "../store/hooks";
import { useSelector } from "react-redux";

const Products: React.FC = () => {
  // const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleDeleteItem = (item: Item) => {
    dispatch(deleteItem(item));
  };

  const handleEditItem = (item: Item) => {
    // setSelectedItem(item);
    console.log("item", item);
    dispatch(setSelectedItem(item));
  };
  return <ItemList onEdit={handleEditItem} onDelete={handleDeleteItem} />;
};
export default Products;
