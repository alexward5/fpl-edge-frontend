import { useEffect } from "react";
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

interface Props {
    gameweekRange: number[];
    numGameweeks: number;
    setGameweekRange: React.Dispatch<React.SetStateAction<number[]>>;
    displayedTeams: string[];
    setDisplayedTeams: React.Dispatch<React.SetStateAction<string[]>>;
    displayedPositions: string[];
    setDisplayedPositions: React.Dispatch<React.SetStateAction<string[]>>;
    uniqueTeamNames: string[];
}

export default function DrawerContent(props: Props) {
    const {
        gameweekRange,
        numGameweeks,
        setGameweekRange,
        displayedTeams,
        setDisplayedTeams,
        displayedPositions,
        setDisplayedPositions,
        uniqueTeamNames,
    } = props;

    useEffect(() => {
        setGameweekRange([1, numGameweeks]);
    }, [numGameweeks]);

    useEffect(() => {
        setDisplayedTeams(uniqueTeamNames);
    }, []);

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
                    defaultValue="14.0"
                    // value={value}
                    // onChange={handleChange}
                    inputMode="numeric"
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
                                key={teamName}
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
