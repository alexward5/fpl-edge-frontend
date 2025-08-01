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
        </Fade>
    );
}
