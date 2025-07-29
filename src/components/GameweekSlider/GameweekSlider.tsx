import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__/gql";

const GET_FPL_EVENTS = gql(`
    query GetFplEvents {
        events {
            id
            is_current
            finished
        }
    }
`);

function valuetext(value: number) {
    return `${value}`;
}

type Props = {
    gameweekRange: number[];
    setGameweekRange: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function RangeSlider(props: Props) {
    const { gameweekRange, setGameweekRange } = props;

    const [numGameweeks, setNumGameweeks] = useState(0);

    const { data } = useQuery(GET_FPL_EVENTS);
    useEffect(() => {
        if (data?.events) {
            let eventCount = 0;
            data.events.forEach((event) => {
                if (event.finished || event.is_current) {
                    eventCount++;
                }
            });
            setGameweekRange([1, eventCount]);
            setNumGameweeks(eventCount);
        }
    }, [data]);

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
                    disableSwap
                />
            </Box>
        </>
    );
}
