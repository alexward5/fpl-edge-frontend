import { useEffect } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import GameweekSlider from "../GameweekSlider/GameweekSlider";
import CheckboxSelect from "../CheckboxSelect/CheckboxSelect";

const drawerWidth = 240;

export default function ResponsiveDrawer(props: any) {
    const {
        gameweekRange,
        numGameweeks,
        setGameweekRange,
        mobileOpen,
        handleDrawerTransitionEnd,
        handleDrawerClose,
        uniqueTeamNames,
        displayedTeams,
        setDisplayedTeams,
        displayedPositions,
        setDisplayedPositions,
    } = props;

    useEffect(() => {
        setGameweekRange([1, numGameweeks]);
    }, [numGameweeks]);

    const drawer = (
        <div>
            <Toolbar
                // sx={{
                //     minHeight: "56px",
                //     height: "56px",
                //     "& .MuiToolbar-root": {
                //         minHeight: "56px",
                //         height: "56px",
                //     },
                // }}
                variant="regular"
            />
            <Divider />
            <Box
                sx={{
                    width: "100%",
                    padding: "10px 25px 0px 25px",
                }}
            >
                <GameweekSlider
                    gameweekRange={gameweekRange}
                    setGameweekRange={setGameweekRange}
                    numGameweeks={numGameweeks}
                />
            </Box>
            <Divider />
            <Box
                sx={{
                    width: "100%",
                    padding: "15px 15px 0px 15px",
                }}
            >
                <CheckboxSelect
                    listItems={["DEF", "MID", "FWD"]}
                    label="Position"
                    selectedList={displayedPositions}
                    setSelectedList={setDisplayedPositions}
                />
                <CheckboxSelect
                    listItems={uniqueTeamNames}
                    label="Team"
                    selectedList={displayedTeams}
                    setSelectedList={setDisplayedTeams}
                />
            </Box>
        </div>
    );

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
                {drawer}
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
                {drawer}
            </Drawer>
        </Box>
    );
}
