import { useState, useRef } from "react";
import Box from "@mui/material/Box";
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

    // Scroll to top of table when user changes page
    const tableRef = useRef<HTMLDivElement>(null);
    const scrollToTop = () => {
        tableRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    const { players } = useData();

    // Filter players based on team/position and price
    const filteredPlayers = players.filter((player) => {
        const isDisplayedPosition = displayedPositions.includes(
            player.fpl_player_position,
        );
        const isDisplayedTeam = displayedTeams.includes(player.fbref_team);

        // Check if player is within max/min price range
        // If either value is empty, use default value instead
        const isDisplayedPrice =
            player.fpl_player_cost >=
                parseFloat(playerPriceRange[0] ? playerPriceRange[0] : "0") &&
            player.fpl_player_cost <=
                parseFloat(playerPriceRange[1] ? playerPriceRange[1] : "999");

        return isDisplayedPosition && isDisplayedTeam && isDisplayedPrice;
    });

    const displayedData: DisplayedData[] = filteredPlayers
        ? filteredPlayers.map((player) => {
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
                  fplPlayerCode: player.fpl_player_code,
                  fplWebName: player.fpl_web_name,
                  fbrefTeam: player.fbref_team,
                  fplPlayerPosition: player.fpl_player_position,
                  fplPlayerCost: player.fpl_player_cost.toFixed(1),
                  fplSelectedByPercent:
                      player.fpl_selected_by_percent.toFixed(1),
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
          })
        : [];

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <EnhancedTable
                ref={tableRef}
                rows={displayedData}
                page={page}
                rowsPerPage={rowsPerPage}
            />
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
