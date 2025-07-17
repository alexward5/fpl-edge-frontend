import { createTheme } from "@mui/material/styles";

// Use module augmentation to add new variables to Theme and ThemeOptions
declare module "@mui/material/styles" {
    interface Theme {
        drawerWidth: string;
    }

    interface ThemeOptions {
        drawerWidth?: string;
    }
}

const theme = createTheme({
    drawerWidth: "240px",
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
    },
});

export default theme;
