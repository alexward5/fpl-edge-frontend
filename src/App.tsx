import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import theme from "./mui-theme";
import PageContent from "./components/PageContent/PageContent.tsx";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box
                className="app-contianer"
                sx={{
                    backgroundColor: theme.darkThemeSurfaceColor_1,
                    [theme.breakpoints.down("sm")]: {
                        position: "relative",
                        minHeight: "100vh",
                    },
                }}
            >
                <PageContent />
            </Box>
        </ThemeProvider>
    );
}

export default App;
