import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";

type Props = {
    summaryText: string;
    children: React.ReactNode;
};

export default function DrawerAccordion(props: Props) {
    const { summaryText, children } = props;
    const theme = useTheme();

    return (
        <Accordion
            defaultExpanded
            disableGutters
            elevation={0}
            square
            sx={{
                backgroundColor: theme.darkThemeSurfaceColor_1,
                borderBottom: `1px solid ${theme.darkThemeBorderColor}`,
                "&:before": {
                    display: "none",
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    margin: 0,
                    padding: 0,
                    minHeight: "unset",
                    "& .MuiAccordionSummary-content": {
                        margin: 0,
                        "&.Mui-expanded": {
                            margin: 0,
                        },
                    },
                    "& .MuiAccordionSummary-expandIconWrapper": {
                        color: theme.themeMainTextColor,
                    },
                }}
            >
                <Typography
                    variant="subtitle1"
                    fontWeight={"bold"}
                    sx={{ marginBottom: "6px" }}
                >
                    {summaryText}
                </Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    padding: 0,
                }}
            >
                {children}
            </AccordionDetails>
        </Accordion>
    );
}
