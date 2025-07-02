import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import DrawerContent from "./DrawerContent/DrawerContent";

const drawerWidth = 240;

type Props = {
    gameweekRange: number[];
    numGameweeks: number;
    setGameweekRange: React.Dispatch<React.SetStateAction<number[]>>;
    mobileOpen: boolean;
    handleDrawerTransitionEnd: () => void;
    handleDrawerClose: () => void;
    displayedTeams: string[];
    setDisplayedTeams: React.Dispatch<React.SetStateAction<string[]>>;
    displayedPositions: string[];
    setDisplayedPositions: React.Dispatch<React.SetStateAction<string[]>>;
    maxPlayerPrice: string;
    setMaxPlayerPrice: React.Dispatch<React.SetStateAction<string>>;
};

export default function ResponsiveDrawer(props: Props) {
    const {
        gameweekRange,
        numGameweeks,
        setGameweekRange,
        mobileOpen,
        handleDrawerTransitionEnd,
        handleDrawerClose,
        displayedTeams,
        setDisplayedTeams,
        displayedPositions,
        setDisplayedPositions,
        maxPlayerPrice,
        setMaxPlayerPrice,
    } = props;

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                <DrawerContent
                    gameweekRange={gameweekRange}
                    numGameweeks={numGameweeks}
                    setGameweekRange={setGameweekRange}
                    displayedTeams={displayedTeams}
                    setDisplayedTeams={setDisplayedTeams}
                    displayedPositions={displayedPositions}
                    setDisplayedPositions={setDisplayedPositions}
                    maxPlayerPrice={maxPlayerPrice}
                    setMaxPlayerPrice={setMaxPlayerPrice}
                />
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
                open
            >
                <DrawerContent
                    gameweekRange={gameweekRange}
                    numGameweeks={numGameweeks}
                    setGameweekRange={setGameweekRange}
                    displayedTeams={displayedTeams}
                    setDisplayedTeams={setDisplayedTeams}
                    displayedPositions={displayedPositions}
                    setDisplayedPositions={setDisplayedPositions}
                    maxPlayerPrice={maxPlayerPrice}
                    setMaxPlayerPrice={setMaxPlayerPrice}
                />
            </Drawer>
        </Box>
    );
}
