import { useState, useRef, useMemo, useEffect } from "react";
import { orderBy } from "natural-orderby";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import EnhancedTable from "./EnhancedTable/EnhancedTable";
import EnhancedTablePagination from "./EnhancedTable/EnhancedTablePagination/EnhancedTablePagination";

import type DisplayedData from "../../types/DisplayedData";
import { useData } from "../../contexts/DataContext";

type Props = {
    displayedPositions: string[];
    displayedTeams: string[];
    playerPriceRange: string[];
    gameweekRange: number[];
};

export default function PlayerDataTable(props: Props) {
    const {
        displayedPositions,
        displayedTeams,
        playerPriceRange,
        gameweekRange,
    } = props;

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(50);
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [orderColumn, setOrderBy] =
        useState<keyof DisplayedData>("sumPoints");

    // Scroll to top of table when user changes page
    const tableRef = useRef<HTMLDivElement>(null);
    const scrollToTop = () => {
        tableRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Reset to first page of table when any filter changes
    useEffect(() => {
        setPage(0);
        scrollToTop();
    }, [displayedPositions, displayedTeams, playerPriceRange, gameweekRange]);

    const { players } = useData();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        property: keyof DisplayedData,
    ) => {
        const isDesc = orderColumn === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    };

    // Filter by Position and calculate stats
    const positionFilteredData = useMemo(() => {
        const filtered = players.filter((player) =>
            displayedPositions.includes(player.fpl_player_position),
        );

        return filtered.map((player) => {
            // Sum player expected stats from gameweek range
            let gamesPlayed = 0;
            let sumMinutes = 0;
            let sumNPxG = 0;
            let sumxA = 0;
            let sumNPxP = 0;
            let sumPoints = 0;
            let sumGoals = 0;
            let sumAssists = 0;
            let sumBPS = 0;
            let sumCleansheets = 0;
            let sumDefensiveContributions = 0;

            player.player_gameweek_data.forEach((playerGameweek) => {
                if (
                    playerGameweek.fpl_gameweek >= gameweekRange[0] &&
                    playerGameweek.fpl_gameweek <= gameweekRange[1]
                ) {
                    gamesPlayed++;
                    sumMinutes += playerGameweek.fbref_minutes;
                    sumNPxG += playerGameweek.fbref_npxg;
                    sumxA += playerGameweek.fbref_xg_assist;
                    sumNPxP += playerGameweek.calc_fpl_npxp;

                    sumPoints += playerGameweek.fpl_total_points;
                    sumGoals += playerGameweek.fpl_goals_scored;
                    sumAssists += playerGameweek.fpl_assists;
                    sumDefensiveContributions +=
                        playerGameweek.fpl_defensive_contribution;
                    sumBPS += playerGameweek.fpl_bps;
                    sumCleansheets += playerGameweek.fpl_clean_sheet;
                }
            });

            return {
                rank: 0, // Placeholder, will be set later on
                fplPlayerCode: player.fpl_player_code,
                fplWebName: player.fpl_web_name,
                fbrefTeam: player.fbref_team,
                fplPlayerPosition: player.fpl_player_position,
                fplPlayerCost: player.fpl_player_cost.toFixed(1),
                fplSelectedByPercent: player.fpl_selected_by_percent.toFixed(1),
                gamesPlayed: gamesPlayed,
                sumMinutes: sumMinutes,
                sumNPxG: sumNPxG.toFixed(1),
                sumxA: sumxA.toFixed(1),
                sumNPxP: sumNPxP.toFixed(1),
                sumPoints: sumPoints,
                sumGoals: sumGoals,
                sumAssists: sumAssists,
                sumDefensiveContributions: sumDefensiveContributions,
                sumBPS: sumBPS,
                sumCleansheets: sumCleansheets,
            };
        });
    }, [players, displayedPositions, gameweekRange]);

    // Sort and Rank
    const rankedData = useMemo(() => {
        const sorted = orderBy(positionFilteredData, [orderColumn], order);
        return sorted.map((item, index) => ({
            ...item,
            rank: index + 1,
        }));
    }, [positionFilteredData, order, orderColumn]);

    // Filter by Team and Price
    const displayedData = useMemo(() => {
        return rankedData.filter((player) => {
            const isDisplayedTeam = displayedTeams.includes(player.fbrefTeam);
            const cost = parseFloat(player.fplPlayerCost);
            const min = parseFloat(
                playerPriceRange[0] ? playerPriceRange[0] : "0",
            );
            const max = parseFloat(
                playerPriceRange[1] ? playerPriceRange[1] : "999",
            );
            const isDisplayedPrice = cost >= min && cost <= max;
            return isDisplayedTeam && isDisplayedPrice;
        });
    }, [rankedData, displayedTeams, playerPriceRange]);

    return (
        <Box
            sx={{
                width: "100%",
                height: { xs: "auto", md: "100%" },
                display: "flex",
                flexDirection: "column",
            }}
        >
            {isSmallScreen ? (
                <Box
                    sx={{
                        overflowX: "auto",
                        overflowY: "visible",
                        width: "100%",
                        overscrollBehaviorX: "none",
                        overscrollBehaviorY: "none",
                    }}
                    onWheel={(e) => {
                        // Allow vertical scrolling to pass through to the page on small screens
                        if (
                            e.deltaY !== 0 &&
                            Math.abs(e.deltaY) > Math.abs(e.deltaX)
                        ) {
                            window.scrollBy({
                                top: e.deltaY,
                                behavior: "auto",
                            });
                        }
                    }}
                >
                    <EnhancedTable
                        ref={tableRef}
                        rows={displayedData}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        order={order}
                        orderBy={orderColumn}
                        onRequestSort={handleRequestSort}
                    />
                </Box>
            ) : (
                <EnhancedTable
                    ref={tableRef}
                    rows={displayedData}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    order={order}
                    orderBy={orderColumn}
                    onRequestSort={handleRequestSort}
                />
            )}
            <EnhancedTablePagination
                rows={displayedData}
                rowsPerPage={rowsPerPage}
                page={page}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
                scrollToTop={scrollToTop}
            />
        </Box>
    );
}
