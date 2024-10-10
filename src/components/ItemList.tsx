// src/components/ItemList.tsx

import React, { useEffect, useState } from "react";
import { Item } from "../models"; // Adjust path as needed
import { itemService } from "../services/ItemService";
import { Box, Button, styled, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useAppSelector } from "../store/hooks";

interface ItemListProps {
  onEdit: (item: Item) => void;
  onDelete: (id: Item) => void; // New prop for deletion
}
// interface ItemListProps {
//   items: Item[];
//   onEdit: (item: Item) => void;
//   onDelete: (id: Item) => void; // New prop for deletion
// }
const ItemList: React.FC<ItemListProps> = ({ onEdit, onDelete }) => {
  // const [items, setItems] = useState<Item[]>([]);
  // const [error, setError] = useState<string | null>(null);
  const { items, error } = useAppSelector((state) => state.inventory);

  // useEffect(() => {
  //   const loadItems = async () => {
  //     try {
  //       const fetchedItems = await itemService.getAllItems();
  //       setItems(fetchedItems);
  //     } catch (err: any) {
  //       setError(err.message);
  //     }
  //   };

  //   loadItems();
  // }, []);

  const ThumbnailImage = styled("img")({
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  });
  const LargeImage = styled("img")({
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  });
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  const columns: GridColDef[] = [
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      width: 100,
      renderCell: (params: GridRenderCellParams<any, any>) => (
        <Tooltip
          title={
            <LargeImage src={params.row.thumbnailUrl} alt={params.row.name} />
          }
          arrow
          placement="right"
        >
          <ThumbnailImage src={params.row.thumbnailUrl} alt={params.row.name} />
        </Tooltip>
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: GridRenderCellParams<any, any>) => (
        <Box>
          <Button onClick={() => onEdit(params.row)}>Edit</Button>
          <Button onClick={() => onDelete(params.row)}>Delete</Button>
        </Box>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={items} columns={columns} autoPageSize />
    </div>
  );
};

export default ItemList;
