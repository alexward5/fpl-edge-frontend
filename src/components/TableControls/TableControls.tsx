import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
    return `${value}°C`;
}

export default function RangeSlider(props: any) {
    const { gameweekRange, setGameweekRange } = props;

    const handleChange = (event: Event, newValue: number | number[]) => {
        setGameweekRange(newValue as number[]);
    };

    return (
        <div
            style={{
                width: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div style={{ marginRight: "10px" }}>
                <h1>{gameweekRange[0]}</h1>
            </div>
            <Slider
                getAriaLabel={() => "Gameweek Range"}
                value={gameweekRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                step={1}
                min={1}
                max={24}
            />
            <div style={{ marginLeft: "10px" }}>
                <h1>{gameweekRange[1]}</h1>
            </div>
        </div>
    );
}
