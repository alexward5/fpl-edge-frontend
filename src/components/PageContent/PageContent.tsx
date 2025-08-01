import { useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "./Header/Header";
import PlayerData from "../PlayerData/PlayerData";
import { useTheme } from "@mui/material/styles";
import { useLoading } from "../../contexts/LoadingContext";

function PageContent() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const theme = useTheme();
    const { isLoading } = useLoading();

    return (
        <>
            <Header handleDrawerToggle={handleDrawerToggle} />
            {isLoading ? (
                <Box
                    sx={{
                        height: {
                            xs: `calc(100% - ${theme.appBarHeightXs})`,
                            sm: `calc(100% - ${theme.appBarHeightSm})`,
                        },
                        mt: {
                            xs: theme.appBarHeightXs,
                            sm: theme.appBarHeightSm,
                        },
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress
                        sx={{
                            color: "black",
                        }}
                    />
                </Box>
            ) : (
                <PlayerData
                    handleDrawerClose={handleDrawerClose}
                    handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                    mobileOpen={mobileOpen}
                />
            )}
        </>
    );
}

export default PageContent;
