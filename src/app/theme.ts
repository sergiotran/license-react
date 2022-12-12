import { createTheme, PaletteOptions } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

const themePalette: PaletteOptions = {
  primary: {
    main: "#3cbfae",
    dark: "#0a162c"
  },
  secondary: {
    main: "#FFAB21",
  },
};

const themeTypography: TypographyOptions = {
  allVariants: {
    fontFamily: [
      '"Open Sans"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
};

const theme = createTheme({
  palette: themePalette,
  typography: themeTypography,
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
  },
});

export default theme;
