import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import DrawerAccordion from "../DrawerAccordion/DrawerAccordion";
import { useData } from "../../../../contexts/DataContext";
import { useTheme } from "@mui/material/styles";

type Props = {
    displayedTeams: string[];
    setDisplayedTeams: React.Dispatch<React.SetStateAction<string[]>>;
};

const TeamFilter: React.FC<Props> = ({ displayedTeams, setDisplayedTeams }) => {
    const { teams } = useData();
    const theme = useTheme();

    const teamNames = teams
        .map((team) => team.fbref_team)
        .sort((a, b) => a.localeCompare(b));

    const selectedCount = displayedTeams.length;
    const summaryText = `Teams (${selectedCount})`;
    const allTeamsSelected =
        teamNames.length > 0 && displayedTeams.length === teamNames.length;
    const someTeamsSelected =
        displayedTeams.length > 0 && displayedTeams.length < teamNames.length;

    const handleToggleAllTeams = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setDisplayedTeams(teamNames);
        } else {
            setDisplayedTeams([]);
        }
    };

    const handleTeamToggle =
        (teamName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setDisplayedTeams((prevTeams) => {
                if (e.target.checked) {
                    return prevTeams.includes(teamName)
                        ? prevTeams
                        : [...prevTeams, teamName];
                }

                return prevTeams.filter((team) => team !== teamName);
            });
        };

    return (
        <Box>
            <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ marginBottom: theme.spacing(1.5), lineHeight: 1 }}
            >
                Filters
            </Typography>
            <DrawerAccordion summaryText={summaryText}>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                        <Stack spacing={0.5} sx={{ padding: theme.spacing(1) }}>
                            <Checkbox
                                indeterminate={someTeamsSelected}
                                checked={allTeamsSelected}
                                onChange={handleToggleAllTeams}
                                size="small"
                                sx={{
                                    height: "22px",
                                    width: "22px",
                                }}
                            />
                            {teamNames.map((teamName: string) => (
                                <FormControlLabel
                                    key={teamName}
                                    id={`team-filter-${teamName}`}
                                    control={
                                        <Checkbox
                                            checked={displayedTeams.includes(
                                                teamName,
                                            )}
                                            onChange={handleTeamToggle(
                                                teamName,
                                            )}
                                            name={teamName}
                                            size="small"
                                            sx={{
                                                height: "22px",
                                                width: "22px",
                                                marginRight: theme.spacing(0.5),
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle2">
                                            {teamName}
                                        </Typography>
                                    }
                                    sx={{ paddingLeft: theme.spacing(1) }}
                                />
                            ))}
                        </Stack>
                    </FormGroup>
                </FormControl>
            </DrawerAccordion>
        </Box>
    );
};

export default TeamFilter;
