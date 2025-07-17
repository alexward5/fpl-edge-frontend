import { createTheme } from "@mui/material/styles";

// Use module augmentation to add new variables to Theme and ThemeOptions
declare module "@mui/material/styles" {
    interface Theme {
        drawerWidth: string;
        themeMainColor: string;
    }

    interface ThemeOptions {
        drawerWidth?: string;
        themeMainColor?: string;
    }
}

const themeMainColor = "rgb(76, 230, 137)";

const theme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    [theme.breakpoints.up("xs")]: {
                        height: 46,
                    },
                    [theme.breakpoints.up("sm")]: {
                        height: 56,
                    },
                }),
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    minHeight: 46,
                    [theme.breakpoints.up("sm")]: {
                        minHeight: 56,
                    },
                }),
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    "&.Mui-checked": {
                        color: "#000000",
                    },
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: themeMainColor,
                },
                thumb: {
                    backgroundColor: "#fff",
                    border: "2px solid #000000",
                    width: 18,
                    height: 18,
                },
            },
        },
    },
    drawerWidth: "240px",
    themeMainColor: themeMainColor,
});

export default theme;
