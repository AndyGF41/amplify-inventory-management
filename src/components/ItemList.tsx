// src/components/ItemList.tsx

import { Item } from "../models";
import { Link } from "react-router-dom";
import { Box, Button, Chip, Stack, styled, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setSelectedItem } from "../features/inventory/inventorySlice";

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
  const dispatch = useAppDispatch();
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
    { field: "price", headerName: "Price", width: 150 },
    { field: "cost", headerName: "Cost", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "categorySet", headerName: "Categories", width: 150 },
    {
      field: "attributes",
      headerName: "Attributes",
      width: 150,

      renderCell: (params: GridRenderCellParams<any, any>) => {
        let attributes = {};
        if (typeof params.row.attributes === "string") {
          try {
            attributes = JSON.parse(params.row.attributes);
          } catch (error) {
            console.error("Failed to parse attributes:", error);
          }
        } else if (
          typeof params.row.attributes === "object" &&
          params.row.attributes !== null
        ) {
          attributes = params.row.attributes;
        }

        console.log("attributes", attributes);
        console.log(Object.entries(attributes));
        return (
          <>
            {Object.entries(attributes).map(([key, value]) => (
              <Chip key={key} label={`${key}: ${value}`} />
            ))}
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: GridRenderCellParams<any, any>) => (
        <Box>
          <Button 
            component={Link} 
            to="/inventory" 
            onClick={() => {
              dispatch(setSelectedItem(params.row));
              onEdit(params.row);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => onDelete(params.row)}>Delete</Button>
        </Box>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          pt: 1,
          pb: 1,
          // bgcolor: "yellow",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button href="/inventory">+ New Item</Button>
      </Stack>
      <DataGrid rows={items} columns={columns} autoPageSize />
    </div>
  );
};

export default ItemList;
