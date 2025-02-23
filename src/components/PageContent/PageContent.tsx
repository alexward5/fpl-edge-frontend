import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Box from "@mui/material/Box";
import Header from "../Header/Header";
import Drawer from "../Drawer/Drawer";

import EnhancedTable from "../EnhancedTable/EnhancedTable";
import EnhancedTablePagination from "../EnhancedTable/EnhancedTablePagination/EnhancedTablePagination";

interface DisplayedData {
    fplPlayerCode: string;
    fplWebName: string;
    fbrefTeam: string;
    fplPlayerPosition: string;
    fplPlayerCost: number;
    fplSelectedByPercent: number;
    minutes: number;
    sumNPxG: number;
    sumxA: number;
    sumNPxP: number;
}

const GET_PLAYER_GAMEWEEK_DATA = gql(`
    query GetPlayerGameweekData {
        players {
            fpl_player_code
            fpl_web_name
            fbref_team
            fpl_player_position
            fpl_player_cost
            fpl_selected_by_percent
            player_gameweek_data {
                round
                minutes
                calc_fpl_npxp
                fbref_xg_assist
                fbref_npxg
            }
        }
    }
`);

function createData(
    id: number,
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
): any {
    return {
        id,
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

const rows = [
    createData(1, "Cupcake", 305, 3.7, 67, 4.3),
    createData(2, "Donut", 452, 25.0, 51, 4.9),
    createData(3, "Eclair", 262, 16.0, 24, 6.0),
    createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
    createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
    createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
    createData(9, "KitKat", 518, 26.0, 65, 7.0),
    createData(10, "Lollipop", 392, 0.2, 98, 0.0),
    createData(11, "Marshmallow", 318, 0, 81, 2.0),
    createData(12, "Nougat", 360, 19.0, 9, 37.0),
    createData(13, "Oreo", 437, 18.0, 63, 4.0),
    createData(14, "Cupcakes", 305, 3.7, 67, 4.3),
    createData(22, "Donuts", 452, 25.0, 51, 4.9),
    createData(23, "Eclairs", 262, 16.0, 24, 6.0),
    createData(24, "Frozen yoghurts", 159, 6.0, 24, 4.0),
    createData(25, "Gingerbreads", 356, 16.0, 49, 3.9),
    createData(26, "Honeycombs", 408, 3.2, 87, 6.5),
    createData(27, "Ice cream sandwichs", 237, 9.0, 37, 4.3),
    createData(28, "Jelly Beans", 375, 0.0, 94, 0.0),
    createData(29, "KitKats", 518, 26.0, 65, 7.0),
    createData(210, "Lollipops", 392, 0.2, 98, 0.0),
    createData(211, "Marshmallows", 318, 0, 81, 2.0),
    createData(212, "Nougats", 360, 19.0, 9, 37.0),
    createData(213, "Oreos", 437, 18.0, 63, 4.0),
];

function PageContent() {
    const { loading, data } = useQuery(GET_PLAYER_GAMEWEEK_DATA);

    const [gameweekRange, setGameweekRange] = useState<number[]>([1, 1]);
    const [displayedPositions, setDisplayedPositions] = useState<string[]>([
        "DEF",
        "MID",
        "FWD",
    ]);
    const [displayedTeams, setDisplayedTeams] = useState<string[]>([]);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

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

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading) return <h1>Loading...</h1>;

    const numGameweeks = Math.max(
        ...data.players.map(
            (obj: { player_gameweek_data: any }) =>
                obj.player_gameweek_data.length,
        ),
    );

    const teamNames: string[] = data.players.map(
        (player: any) => player.fbref_team,
    );
    const uniqueTeamNames = [...new Set(teamNames)].sort(
        (a: string, b: string) => a.localeCompare(b),
    );

    const filteredPlayers = data.players.filter((player: any) => {
        return (
            displayedPositions.includes(player.fpl_player_position) &&
            displayedTeams.includes(player.fbref_team)
        );
    });

    const displayedData: DisplayedData[] = filteredPlayers.map(
        (player: any) => {
            // Sum player expected stats from gameweek range
            let sumMinutes = 0;
            let sumNPxG = 0;
            let sumxA = 0;
            let sumNPxP = 0;
            player.player_gameweek_data.forEach((data: any) => {
                if (
                    data.round >= gameweekRange[0] &&
                    data.round <= gameweekRange[1]
                ) {
                    sumMinutes += data.minutes;
                    sumNPxG += data.fbref_npxg;
                    sumxA += data.fbref_xg_assist;
                    sumNPxP += data.calc_fpl_npxp;
                }
            });

            return {
                fplPlayerCode: player.fpl_player_code,
                fplWebName: player.fpl_web_name,
                fbrefTeam: player.fbref_team,
                fplPlayerPosition: player.fpl_player_position,
                fplPlayerCost: player.fpl_player_cost,
                fplSelectedByPercent: player.fpl_selected_by_percent,
                sumMinutes: sumMinutes,
                sumNPxG: sumNPxG,
                sumxA: sumxA,
                sumNPxP: sumNPxP,
            };
        },
    );

    const drawerWidth = 240;

    return (
        <>
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Drawer
                numGameweeks={numGameweeks}
                gameweekRange={gameweekRange}
                setGameweekRange={setGameweekRange}
                mobileOpen={mobileOpen}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                handleDrawerClose={handleDrawerClose}
                uniqueTeamNames={uniqueTeamNames}
                displayedTeams={displayedTeams}
                setDisplayedTeams={setDisplayedTeams}
                displayedPositions={displayedPositions}
                setDisplayedPositions={setDisplayedPositions}
            />
            <Box
                sx={{
                    backgroundColor: "lightcyan",
                    height: {
                        xs: `calc(100% - 56px)`,
                        sm: `calc(100% - 64px)`,
                    },
                    mt: { xs: "56px", sm: "64px" },
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "lightpink",
                        height: `calc(100% - 52px)`,
                        overflow: "auto",
                    }}
                >
                    <EnhancedTable
                        rows={rows}
                        page={page}
                        rowsPerPage={rowsPerPage}
                    />
                </Box>
                <EnhancedTablePagination
                    rows={rows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Box>
        </>
    );
}

export default PageContent;
