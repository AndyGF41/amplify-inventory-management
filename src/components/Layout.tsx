import React, { ReactNode, useState } from "react";
import {
  Toolbar,
  CssBaseline,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Stack,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DrawerComponent from "./Drawer";
import Navbar from "./Navbar";

// Define drawer width for the sidebar
interface LayoutProps {
  children: ReactNode; // This will allow the component to accept children
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar onDrawerToggle={handleDrawerToggle} />
      {/* Sidebar */}
      {isMobile ? (
        <DrawerComponent
          drawerVariant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
        />
      ) : (
        <DrawerComponent
          drawerVariant="permanent"
          open
          onClose={handleDrawerToggle}
        />
      )}
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // bgcolor: "red",
          p: 3,
          // marginLeft: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Container
          sx={
            {
              // bgcolor: "blue",
              // marginLeft: `${drawerWidth}px`,
            }
          }
        >
          <Grid
            container
            spacing={3}
            sx={
              {
                // bgcolor: "green",
                // marginLeft: `${drawerWidth}px`,
              }
            }
          >
            <Grid
              size={{
                xs: 12,
              }}
            >
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
