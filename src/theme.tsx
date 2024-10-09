import { createTheme, responsiveFontSizes } from "@mui/material";

export const tokens = {};
const theme = createTheme({
  palette: {
    primary: {
      main: "#86d9e5",
    },
    secondary: {
      main: "#1a2749",
      contrastText: "#ffffff",
    },
    background: {
      default: "#e2ebfc",
      paper: "#f9fbff",
    },
    text: {
      primary: "#000000",
      secondary: "#A3A6AD",
    },
    error: {
      main: "#f32f7a",
    },
  },

  typography: {
    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 20,
    },
  },

  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "16px", // Change font size
          fontFamily: ["Source Sans Pro", "sans-serif"], // Change font family
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          border: 0,
          color: "white",
          height: 40,
          padding: "0 30px",
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        // This sets the background color for all Paper components globally
        elevation: 0, // Optional: set a default elevation
      },
      styleOverrides: {
        root: {
          backgroundColor: "#f9fbff", // Set your global background color here
          borderRadius: 10,
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
