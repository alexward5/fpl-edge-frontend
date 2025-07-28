import { createTheme } from "@mui/material/styles";

// Use module augmentation to add new variables to Theme and ThemeOptions
declare module "@mui/material/styles" {
    interface Theme {
        drawerWidth: string;
        themeMainColor: string;
        appBarHeightXs: string;
        appBarHeightSm: string;
    }

    interface ThemeOptions {
        drawerWidth?: string;
        themeMainColor?: string;
        appBarHeightXs?: string;
        appBarHeightSm?: string;
    }
}

const themeMainColor = "rgb(76, 230, 137)";

const drawerWidth = "240px";
const appBarHeightXs = "46px";
const appBarHeightSm = "56px";

const theme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    [theme.breakpoints.up("xs")]: {
                        height: appBarHeightXs,
                    },
                    [theme.breakpoints.up("sm")]: {
                        height: appBarHeightSm,
                    },
                }),
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    minHeight: appBarHeightXs,
                    [theme.breakpoints.up("sm")]: {
                        minHeight: appBarHeightSm,
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
    themeMainColor: themeMainColor,
    drawerWidth: drawerWidth,
    appBarHeightXs: appBarHeightXs,
    appBarHeightSm: appBarHeightSm,
});

export default theme;
