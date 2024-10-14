import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Badge,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InventoryIcon from "@mui/icons-material/Inventory";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";

interface NavbarProps {
  onDrawerToggle: () => void;
}
const Navbar = ({ onDrawerToggle }: NavbarProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <InventoryIcon sx={{ display: { xs: "none", sm: "block" }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Inventory Management
        </Typography>
        {/* Search Bar */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            bgcolor: "rgba(255, 255, 255, 0.15)",
            borderRadius: 1,
            px: 1,
          }}
        >
          <InputBase
            placeholder="Search…"
            sx={{ ml: 1, flex: 1, color: "inherit" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
        {/* Notifications Icon */}
        <IconButton color="inherit" sx={{ ml: 2 }}>
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Settings Icon */}
        <IconButton color="inherit" sx={{ ml: 1 }}>
          <SettingsIcon />
        </IconButton>

        {/* User Avatar */}
        <IconButton sx={{ ml: 1 }}>
          <Avatar alt="User Name" src="/path-to-user-avatar.jpg" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
