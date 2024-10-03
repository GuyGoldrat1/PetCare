import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue, purple, red } from "@mui/material/colors";

export const tokens = ({

})
const theme = createTheme({
  palette: {
    primary: {
      main: "#868dfb",
    },
    secondary: {
      main: "#4cceac",
    },
    success: {
      main: "#db4f4a",
    },
    green: {
      main: '#E3D026',
      light: "#db4f4a",
      dark: "#db4f4a",
      contrastText: "#db4f4a",
    },
    background: {
      default: '#e2ebfc',
    },
    text: {
      primary: '#000000',
      secondary: '#f6faff',
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
          fontSize: '16px',  // Change font size
          fontFamily: ["Source Sans Pro", "sans-serif"],  // Change font family
        }
      }
    },
      MuiPaper: {
      defaultProps: {
        // This sets the background color for all Paper components globally
        elevation: 0, // Optional: set a default elevation
      },
      styleOverrides: {
        root: {
          backgroundColor: '#f9fbff',  // Set your global background color here
          borderRadius: 10,
        },
      },
    },

  }


});

export default responsiveFontSizes(theme);
