import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useData } from "../../../../contexts/DataContext";

type Props = {
    gameweekRange: number[];
    setGameweekRange: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function RangeSlider(props: Props) {
    const { gameweekRange, setGameweekRange } = props;

    const { events } = useData();
    const numGameweeks = events.filter(
        (event) => event.finished || event.is_current,
    ).length;

    // Set minimum distance between slider thumbs
    const minDistance = 1;
    const handleChange = (
        _event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setGameweekRange([
                Math.min(newValue[0], gameweekRange[1] - minDistance),
                gameweekRange[1],
            ]);
        } else {
            setGameweekRange([
                gameweekRange[0],
                Math.max(newValue[1], gameweekRange[0] + minDistance),
            ]);
        }
    };

    // Currently selected slider range to be displayed
    const marks = [
        { value: 1, label: gameweekRange[0] },
        { value: numGameweeks, label: gameweekRange[1] },
    ];

    return (
        <>
            <Typography variant="subtitle1" fontWeight={"bold"}>
                Gameweeks
            </Typography>
            <Box
                sx={{
                    width: "100%",
                    padding: "0px 9px",
                }}
            >
                <Slider
                    getAriaLabel={() => "Gameweek Range"}
                    value={gameweekRange}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={(value: number) => `${value}`}
                    step={1}
                    min={1}
                    max={numGameweeks}
                    marks={marks}
                    disableSwap
                />
            </Box>
        </>
    );
}
