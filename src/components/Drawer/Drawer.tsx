import { useEffect } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import GameweekSlider from "../GameweekSlider/GameweekSlider";
import CheckboxSelect from "../CheckboxSelect/CheckboxSelect";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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

    console.log("uniqueTeamNames", uniqueTeamNames);
    console.log("displayedTeams", displayedTeams);

    useEffect(() => {
        setGameweekRange([1, numGameweeks]);
    }, [numGameweeks]);

    useEffect(() => {
        setDisplayedTeams(uniqueTeamNames);
    }, []);

    const drawer = (
        <div style={{ display: "flex", flexDirection: "column" }}>
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
                    height: "68px",
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
                    height: "82px",
                    padding: "15px 15px 0px 15px",
                }}
            >
                <CheckboxSelect
                    listItems={["DEF", "MID", "FWD"]}
                    label="Position"
                    selectedList={displayedPositions}
                    setSelectedList={setDisplayedPositions}
                />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    paddingLeft: "15px",
                    height: `calc(100vh - (64px + 68px + 82px + 2px))`,
                    overflow: "auto",
                }}
            >
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                        <FormControlLabel
                            label={
                                <span
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Teams
                                </span>
                            }
                            control={
                                <Checkbox
                                    checked={
                                        uniqueTeamNames.length ===
                                        displayedTeams.length
                                    }
                                    indeterminate={
                                        uniqueTeamNames.length !==
                                        displayedTeams.length
                                    }
                                    onChange={() => {
                                        if (
                                            uniqueTeamNames.length ===
                                            displayedTeams.length
                                        ) {
                                            setDisplayedTeams([]);
                                        } else {
                                            setDisplayedTeams(uniqueTeamNames);
                                        }
                                    }}
                                    sx={{
                                        height: "28px",
                                    }}
                                />
                            }
                        />
                        {uniqueTeamNames.map((teamName: string) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={displayedTeams.includes(
                                            teamName,
                                        )}
                                        onChange={(e) => {
                                            console.log(e.target.checked);
                                            if (e.target.checked) {
                                                setDisplayedTeams([
                                                    ...displayedTeams,
                                                    teamName,
                                                ]);
                                            } else {
                                                setDisplayedTeams(
                                                    displayedTeams.filter(
                                                        (team: string) =>
                                                            team !== teamName,
                                                    ),
                                                );
                                            }
                                        }}
                                        name={teamName}
                                        size="small"
                                        sx={{
                                            height: "28px",
                                        }}
                                    />
                                }
                                sx={{ paddingLeft: "15px" }}
                                label={
                                    <span style={{ fontSize: "15px" }}>
                                        {teamName}
                                    </span>
                                }
                            />
                        ))}
                    </FormGroup>
                </FormControl>
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
