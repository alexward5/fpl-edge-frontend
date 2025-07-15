import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import CheckboxSelect from "../../CheckboxSelect/CheckboxSelect";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import GameweekSlider from "../../GameweekSlider/GameweekSlider";
import { TextField } from "@mui/material";
import { gql } from "../../../__generated__/gql";

interface Props {
    gameweekRange: number[];
    numGameweeks: number;
    setGameweekRange: React.Dispatch<React.SetStateAction<number[]>>;
    displayedTeams: string[];
    setDisplayedTeams: React.Dispatch<React.SetStateAction<string[]>>;
    displayedPositions: string[];
    setDisplayedPositions: React.Dispatch<React.SetStateAction<string[]>>;
    maxPlayerPrice: string;
    setMaxPlayerPrice: React.Dispatch<React.SetStateAction<string>>;
}

const GET_TEAM_DATA = gql(`
    query GetTeamNames {
        teams {
            fbref_team
        }
    }
`);

export default function DrawerContent(props: Props) {
    const {
        gameweekRange,
        numGameweeks,
        setGameweekRange,
        displayedTeams,
        setDisplayedTeams,
        displayedPositions,
        setDisplayedPositions,
        maxPlayerPrice,
        setMaxPlayerPrice,
    } = props;

    const { data } = useQuery(GET_TEAM_DATA);

    const [teamNames, setTeamNames] = useState<string[]>([]);

    useEffect(() => {
        if (data?.teams) {
            const sortedTeamNames = data.teams
                .map((team) => team.fbref_team)
                .sort((a, b) => a.localeCompare(b));
            setTeamNames(sortedTeamNames);
            setDisplayedTeams(sortedTeamNames);
        }
    }, [data]);

    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const digitCount = newValue.replace(/\D/g, "").length;

        // Check that input is valid float and is three digits or less
        if (/^$|^\d*\.?\d*$/.test(newValue) && digitCount <= 3) {
            setMaxPlayerPrice(newValue);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                flexDirection: "column",
            }}
        >
            <Toolbar variant="regular" />
            <Divider />
            <Typography
                variant="subtitle1"
                fontWeight={"bold"}
                sx={{ padding: "5px 0px 0px 18px" }}
            >
                Gameweeks
            </Typography>
            <Box
                sx={{
                    width: "100%",
                    height: "68px",
                    padding: "0px 25px 0px 25px",
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
                    padding: "15px 15px 10px 15px",
                }}
            >
                <CheckboxSelect
                    listItems={["DEF", "MID", "FWD"]}
                    label="Position"
                    selectedList={displayedPositions}
                    setSelectedList={setDisplayedPositions}
                />
                <TextField
                    label="Maximum Price"
                    type="number"
                    value={maxPlayerPrice}
                    onChange={handleChangePrice}
                    inputMode="numeric"
                    slotProps={{
                        htmlInput: {
                            step: 0.1,
                            min: 0.0,
                        },
                    }}
                    sx={{
                        width: "100%",
                        marginTop: "15px",
                    }}
                />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    paddingLeft: "15px",
                    flexGrow: 1,
                    overflowY: "auto",
                }}
            >
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                        <FormControlLabel
                            label={
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={"bold"}
                                >
                                    Teams
                                </Typography>
                            }
                            control={
                                <Checkbox
                                    checked={
                                        teamNames.length ===
                                        displayedTeams.length
                                    }
                                    indeterminate={
                                        teamNames.length !==
                                        displayedTeams.length
                                    }
                                    onChange={() => {
                                        if (
                                            teamNames.length ===
                                            displayedTeams.length
                                        ) {
                                            setDisplayedTeams([]);
                                        } else {
                                            setDisplayedTeams(teamNames);
                                        }
                                    }}
                                    sx={{
                                        height: "28px",
                                    }}
                                />
                            }
                        />
                        {teamNames.map((teamName: string) => (
                            <FormControlLabel
                                key={teamName}
                                control={
                                    <Checkbox
                                        checked={displayedTeams.includes(
                                            teamName,
                                        )}
                                        // Toggle team in displayedTeams
                                        onChange={(e) => {
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
                                    <Typography variant="subtitle2">
                                        {teamName}
                                    </Typography>
                                }
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            </Box>
        </div>
    );
}
