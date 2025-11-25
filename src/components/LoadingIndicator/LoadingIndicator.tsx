import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/material/styles";

export default function LoadingIndicator() {
    const theme = useTheme();

    return (
        <Fade in={true} timeout={600}>
            <Box
                sx={{
                    position: "fixed",
                    top: {
                        xs: theme.appBarHeightXs,
                        sm: theme.appBarHeightSm,
                    },
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress
                    sx={{
                        color: theme.themeMainColor,
                    }}
                />
            </Box>
        </Fade>
    );
}
