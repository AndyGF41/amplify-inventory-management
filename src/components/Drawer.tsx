import {
  Toolbar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Link,
  List,
  Drawer,
  DrawerProps,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
interface DrawerComponentProps {
  drawerVariant: DrawerProps["variant"];
  open: boolean;
  onClose: () => void;
}

const DrawerComponent = ({
  drawerVariant,
  open,
  onClose,
}: DrawerComponentProps) => {
  const drawerWidth = 240;

  const [drawerState, setDrawerState] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerState(!drawerState);
  };
  const drawerContent = (
    <>
      <Toolbar>
        <IconButton onClick={handleDrawerToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {[
            { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
            { text: "Inventory", icon: <InventoryIcon />, path: "/inventory" },
            { text: "Products", icon: <InventoryIcon />, path: "/products" },
            { text: "Orders", icon: <ShoppingCartIcon />, path: "/orders" },
            { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
          ].map((item) => (
            <Link
              key={item.text}
              href={item.path}
              color="inherit"
              underline="none"
            >
              <ListItemButton key={item.text}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Box>
    </>
  );
  return (
    <Drawer
      variant={drawerVariant}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      open={open}
      onClose={onClose}
    >
      {drawerContent}
    </Drawer>
  );
};
export default DrawerComponent;
