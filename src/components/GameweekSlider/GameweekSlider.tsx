import { useEffect } from "react";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
    return `${value}`;
}

export default function RangeSlider(props: any) {
    const { gameweekRange, setGameweekRange, numGameweeks } = props;

    useEffect(() => {
        setGameweekRange([1, numGameweeks]);
    }, [numGameweeks]);

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
        { value: 23, label: gameweekRange[1] },
    ];

    return (
        <Slider
            getAriaLabel={() => "Gameweek Range"}
            value={gameweekRange}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            step={1}
            min={1}
            max={numGameweeks}
            marks={marks}
        />
    );
}
