import { createTheme } from "@aws-amplify/ui-react";
import theme from "./inventoryTheme";

const authTheme = createTheme({
  name: "custom-dark-theme",
  tokens: {
    colors: {
      background: {
        primary: "#121212", // Dark background for the modal
        secondary: "#1e1e1e", // Slightly lighter background for form elements
      },
      fonts: {
        default: {
          variable: { value: `"${theme.typography.fontFamily}"` },
          static: { value: '"Roboto", "Helvetica", "Arial", sans-serif' },
        },
      },

      lineHeights: {
        small: { value: "1.25" },
        medium: { value: "1.5" },
        large: { value: "2" },
      },
      font: {
        interactive: "#ffffff", // White text for interactive elements
        primary: "#ffffff", // Primary text color
        secondary: theme.palette.text.secondary, // Secondary text color
      },
      brand: {
        primary: {
          80: "#4dabf5",
          90: "#2196f3",
          100: "#1976d2",
        },
      },
    },
    components: {
      authenticator: {
        modal: {
          backgroundColor: "{colors.background.primary}",
        },
      },
      button: {
        fontWeight: { value: "500" }, // Set the font weight for link buttons
        fontSize: { value: "1rem" },
        primary: {
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          _hover: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
          },
          _focus: {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.dark,
          },
          _active: {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.dark,
          },
        },
        link: {
          color: theme.palette.primary.main,
          backgroundColor: "transparent",
          _hover: {
            backgroundColor: { value: `rgba(144, 202, 249, 0.1)` },
            color: { value: theme.palette.primary.main },
          },
          _focus: {
            color: { value: theme.palette.primary.main },
            backgroundColor: { value: `rgba(144, 202, 249, 0.1)` },
          },
          _active: {
            color: { value: theme.palette.primary.main },
            backgroundColor: { value: `rgba(144, 202, 249, 0.1)` },
          },
        },
      },
      tabs: {
        item: {
          color: theme.palette.text.primary,
          _hover: {
            color: theme.palette.primary.main,
            borderColor: { value: "{colors.highlight.10}" }, // Highlight color on hover
          },
          _active: {
            color: theme.palette.primary.main,
            borderColor: { value: "{colors.highlight.10}" }, // Highlight color when active
          },
        },
      },
    },
  },
});
export default authTheme;
