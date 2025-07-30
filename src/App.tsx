import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./mui-theme";
import PageContent from "./components/PageContent/PageContent.tsx";
import { LoadingProvider } from "./contexts/LoadingContext.tsx";

function App() {
    return (
        <div className="app-contianer">
            <ThemeProvider theme={theme}>
                <LoadingProvider>
                    <PageContent />
                </LoadingProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
