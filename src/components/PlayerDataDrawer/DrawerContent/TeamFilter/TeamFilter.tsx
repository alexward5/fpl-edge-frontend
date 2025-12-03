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

    const teamNames = teams
        .map((team) => team.fbref_team)
        .sort((a, b) => a.localeCompare(b));

    const theme = useTheme();

    const selectedCount = displayedTeams.length;
    const summaryText = `Teams${selectedCount > 0 ? ` (${selectedCount})` : ""}`;

    return (
        <Box>
            <Typography
                variant="subtitle1"
                fontWeight={"bold"}
                sx={{ marginBottom: theme.spacing(1.5), lineHeight: 1 }}
            >
                Filters
            </Typography>
            <DrawerAccordion summaryText={summaryText}>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                        <Stack
                            spacing={0.5}
                            sx={{
                                padding: theme.spacing(1),
                            }}
                        >
                            {teamNames.map((teamName: string) => (
                                <FormControlLabel
                                    id={`team-filter-${teamName}`}
                                    key={teamName}
                                    sx={{ marginLeft: 0 }}
                                    label={
                                        <Typography variant="subtitle2">
                                            {teamName}
                                        </Typography>
                                    }
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
                                                                team !==
                                                                teamName,
                                                        ),
                                                    );
                                                }
                                            }}
                                            name={teamName}
                                            size="small"
                                            sx={{
                                                height: "22px",
                                                width: "22px",
                                            }}
                                        />
                                    }
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
