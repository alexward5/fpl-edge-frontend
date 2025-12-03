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
                borderRadius: "4px",
                "&:before": {
                    display: "none",
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    height: "46px",
                    minHeight: "unset",
                    margin: 0,
                    padding: theme.spacing(0, 1),
                    backgroundColor: theme.darkThemeSurfaceColor_2,
                    borderRadius: "4px",
                    border: "1px solid transparent",
                    "&:hover": {
                        borderColor: theme.darkThemeSurfaceColor_3,
                    },
                    "&.Mui-expanded": {
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    },
                    "& .MuiAccordionSummary-expandIconWrapper": {
                        color: theme.themeMainTextColor,
                    },
                }}
            >
                <Typography variant="subtitle1" fontWeight="normal">
                    {summaryText}
                </Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    padding: 0,
                    backgroundColor: theme.darkThemeSurfaceColor_2,
                    borderBottomLeftRadius: "4px",
                    borderBottomRightRadius: "4px",
                    boxShadow: `inset 0 4px 6px -4px rgba(0, 0, 0, 0.4)`,
                }}
            >
                {children}
            </AccordionDetails>
        </Accordion>
    );
}
