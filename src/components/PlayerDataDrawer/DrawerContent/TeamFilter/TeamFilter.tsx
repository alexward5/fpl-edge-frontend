import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { useData } from "../../../../contexts/DataContext";

type Props = {
    displayedTeams: string[];
    setDisplayedTeams: React.Dispatch<React.SetStateAction<string[]>>;
};

const TeamFilter: React.FC<Props> = ({ displayedTeams, setDisplayedTeams }) => {
    const { teams } = useData();

    const teamNames = teams
        .map((team) => team.fbref_team)
        .sort((a, b) => a.localeCompare(b));

    return (
        <FormControl component="fieldset" variant="standard">
            <FormGroup>
                <FormControlLabel
                    label={
                        <Typography variant="subtitle1" fontWeight={"bold"}>
                            Teams
                        </Typography>
                    }
                    control={
                        <Checkbox
                            checked={teamNames.length === displayedTeams.length}
                            indeterminate={
                                teamNames.length !== displayedTeams.length
                            }
                            onChange={() => {
                                if (
                                    teamNames.length === displayedTeams.length
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
                                checked={displayedTeams.includes(teamName)}
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
    );
};

export default TeamFilter;
