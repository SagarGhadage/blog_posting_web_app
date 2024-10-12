export const getPallete = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
        primary: {
          main: "#3b82f680",//#66b3ff
          light: "#2666dfe3",
          dark: "#000000",
          bglight: "#fafafa",
          bgdark: "#2666dfe3",
          bgtheme: "#FAF7FF",
          bg: "#4299ef",
          delete:'#f57363',
          edit:'#66b3ff',
          btn:'#2666dfe3'
        },
        text: {
          primary: "#000000",
          secondary: "#2666dfe3",
          light:'#000000',
          dark:'#000000'
        },
      }
      : {
        primary: {
          main: "#000000",
          light: "#0000",
          dark: "#0000",
          bglight: "#0000",
          bgtheme: "#0000",
          bg: "#0000",
        },
        text: {
          primary: "#265e95e6",
          secondary: "#356ea6",
          light:'#000000',
          dark:'#000000'
        },
      }),
  },

  typography: {
    body1: {
      fontFamily: "Open Sans, sans-serif",
      fontSize: 16,
      fontWeight: 400,
      // lineHeight: 21.79,
      textAlign: 'left',
    },
    h1: {
      fontFamily: "Ubuntu, sans-serif",
      color: mode === "light" ? "#9785BA" : "#D7C7F4",
      fontWeight: 700,
      fontSize: 32,
      // lineHeight:36.77,
      "@media (max-width:768px)": {
        fontSize: 28,
      }
    },
    h2: {
      fontFamily: "Ubuntu, sans-serif",
      color: "text.primary",
      fontSize: 28,
      fontWeight: 400,
      "@media (max-width:768px)": {
        fontSize: 22,
      },
    },
    h3: {
      fontFamily: "Ubuntu, sans-serif",
      color: "text.primary",
      fontSize: 24,
      fontWeight: 400,
      "@media (max-width:768px)": {
        fontSize: 22,
      },
    },
    heading: {
      fontFamily: "Ubuntu, sans-serif",
      color: "text.primary",
      fontSize: 20,
      fontWeight: 700,
      "@media (max-width:768px)": {
        fontSize: 22,
      },
    },
    subheading: {
      fontFamily: "Ubuntu, sans-serif",
      color: "text.primary",
      fontSize: 16,
      fontWeight: 400,
      "@media (max-width:768px)": {
        fontSize: 14,
      },
    },

  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        size: "large",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "Open Sans, sans-serif",
        },
        contained: {
          fontFamily: "Ubuntu, sans-serif",
          border: 1,
        },
        outlined: {
          fontFamily: "Ubuntu, sans-serif",
          color: mode == "light" ? "#000000" : "#ffffff",
          borderColor: mode == "light" ? "#66b3ff" : "#3d3b41",
          "&:hover": {
            background: mode == "light" ? "#66b3ff" : "#2a2730",
          },
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 512,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
});
