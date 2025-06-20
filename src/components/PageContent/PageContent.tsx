import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__/gql";
import Box from "@mui/material/Box";
import Header from "../Header/Header";
import Drawer from "../Drawer/Drawer";
import EnhancedTable from "../EnhancedTable/EnhancedTable";
import EnhancedTablePagination from "../EnhancedTable/EnhancedTablePagination/EnhancedTablePagination";

import type DisplayedData from "../../types/DisplayedData";
import type { PlayerGameweekData } from "../../__generated__/graphql";
import type { Query } from "../../__generated__/graphql";

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
                fbref_round
                fbref_minutes
                calc_fpl_npxp
                fbref_xg_assist
                fbref_npxg
            }
        }
        teams {
            fbref_team
            fbref_team_matchlog {
                fbref_match_date
                fbref_round
                match_number
            }
        }
    }
`);

function PageContent() {
    const [dataRes, setDataRes] = useState<Query | undefined>(undefined);
    const [maxPlayerPrice, setMaxPlayerPrice] = useState<number>(0);

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
    const [rowsPerPage, setRowsPerPage] = useState(50);

    useEffect(() => {
        if (data) {
            const queryRes = data as Query;
            setDataRes(queryRes);
            setMaxPlayerPrice(
                Math.max(
                    ...data.players.map((player) => player.fpl_player_cost),
                ),
            );
        }
    }, [data]);

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
    if (!dataRes) return <h1>Error retrieving data</h1>;

    // Create mapping for each team from match round to match number
    // Since the round number is not accurate when matches are rescheduled
    type MatchNumberMapping = {
        [key: string]: {
            [key: number]: number;
        };
    };
    const matchNumberMapping: MatchNumberMapping = {};
    dataRes.teams.forEach((team) => {
        matchNumberMapping[team.fbref_team] = {};
        team.fbref_team_matchlog.forEach((match) => {
            matchNumberMapping[team.fbref_team][match.fbref_round] =
                match.match_number;
        });
    });

    const numGameweeks = Math.max(
        ...dataRes.players.map(
            (obj: { player_gameweek_data: PlayerGameweekData[] }) =>
                obj.player_gameweek_data.length,
        ),
    );

    const teamNames: string[] = data
        ? data.players.map((player) => player.fbref_team)
        : [];
    const uniqueTeamNames = [...new Set(teamNames)].sort(
        (a: string, b: string) => a.localeCompare(b),
    );

    const filteredPlayers = dataRes.players.filter((player) => {
        return (
            displayedPositions.includes(player.fpl_player_position) &&
            displayedTeams.includes(player.fbref_team)
        );
    });

    const displayedData: DisplayedData[] = filteredPlayers
        ? filteredPlayers.map((player) => {
              // Sum player expected stats from gameweek range
              let gamesPlayed = 0;
              let sumMinutes = 0;
              let sumNPxG = 0;
              let sumxA = 0;
              let sumNPxP = 0;

              player.player_gameweek_data.forEach((playerGameweek) => {
                  if (
                      matchNumberMapping[player.fbref_team][
                          playerGameweek.fbref_round
                      ] >= gameweekRange[0] &&
                      matchNumberMapping[player.fbref_team][
                          playerGameweek.fbref_round
                      ] <= gameweekRange[1]
                  ) {
                      gamesPlayed++;
                      sumMinutes += playerGameweek.fbref_minutes;
                      sumNPxG += playerGameweek.fbref_npxg;
                      sumxA += playerGameweek.fbref_xg_assist;
                      sumNPxP += playerGameweek.calc_fpl_npxp;
                  }
              });

              return {
                  fplPlayerCode: player.fpl_player_code,
                  fplWebName: player.fpl_web_name,
                  fbrefTeam: player.fbref_team,
                  fplPlayerPosition: player.fpl_player_position,
                  fplPlayerCost: Number(player.fpl_player_cost.toFixed(1)),
                  fplSelectedByPercent: Number(
                      player.fpl_selected_by_percent.toFixed(1),
                  ),
                  gamesPlayed: gamesPlayed,
                  sumMinutes: sumMinutes,
                  sumNPxG: Number(sumNPxG.toFixed(1)),
                  sumxA: Number(sumxA.toFixed(1)),
                  sumNPxP: Number(sumNPxP.toFixed(1)),
              };
          })
        : [];

    const DRAWER_WIDTH = 240;

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
                maxPlayerPrice={maxPlayerPrice}
            />
            <Box
                sx={{
                    height: {
                        xs: `calc(100% - 56px)`,
                        sm: `calc(100% - 64px)`,
                    },
                    mt: { xs: "56px", sm: "64px" },
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    ml: { sm: `${DRAWER_WIDTH}px` },
                }}
            >
                <Box
                    sx={{
                        height: `calc(100% - 52px)`,
                        overflow: "auto",
                    }}
                >
                    <EnhancedTable
                        rows={displayedData}
                        page={page}
                        rowsPerPage={rowsPerPage}
                    />
                </Box>
                <EnhancedTablePagination
                    rows={displayedData}
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
