import React, { ReactNode, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemText,
  CssBaseline,
  Box,
  Container,
  IconButton,
  useMediaQuery,
  useTheme,
  ListItemButton,
  ListItemIcon,
  InputBase,
  Avatar,
  Badge,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

// Define drawer width for the sidebar
const drawerWidth = 240;
interface LayoutProps {
  children: ReactNode; // This will allow the component to accept children
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
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

      {/* Sidebar */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={drawerState}
          onCanPlay={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          // marginLeft: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Container>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              {children}{" "}
              {/* This is where the forms and list will be rendered */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
