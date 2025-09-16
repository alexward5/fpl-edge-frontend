import Box from "@mui/material/Box";
import PositionSelect from "../PositionSelect/PositionSelect";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type Props = {
    displayedPositions: string[];
    setDisplayedPositions: React.Dispatch<React.SetStateAction<string[]>>;
    playerPriceRange: string[];
    setPlayerPriceRange: React.Dispatch<React.SetStateAction<string[]>>;
};

const PlayerFilters: React.FC<Props> = ({
    displayedPositions,
    setDisplayedPositions,
    playerPriceRange,
    setPlayerPriceRange,
}) => {
    const handleChangeMinPrice = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newValue = event.target.value;
        const digitCount = newValue.replace(/\D/g, "").length;

        // Check that input is valid float and is three digits or less
        if (/^$|^\d*\.?\d*$/.test(newValue) && digitCount <= 3) {
            setPlayerPriceRange([newValue, playerPriceRange[1]]);
        }
    };

    const handleChangeMaxPrice = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newValue = event.target.value;
        const digitCount = newValue.replace(/\D/g, "").length;

        // Check that input is valid float and is three digits or less
        if (/^$|^\d*\.?\d*$/.test(newValue) && digitCount <= 3) {
            setPlayerPriceRange([playerPriceRange[0], newValue]);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <PositionSelect
                selectedList={displayedPositions}
                setSelectedList={setDisplayedPositions}
            />
            <Typography variant="subtitle1" fontWeight={"bold"}>
                Price
            </Typography>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <TextField
                    type="number"
                    value={playerPriceRange[0]}
                    onChange={handleChangeMinPrice}
                    inputMode="numeric"
                    slotProps={{
                        htmlInput: {
                            step: 0.1,
                            min: 0.0,
                        },
                    }}
                />
                <Typography
                    variant="subtitle1"
                    fontWeight={"bold"}
                    sx={{ padding: "0px 4px" }}
                >
                    to
                </Typography>
                <TextField
                    type="number"
                    value={playerPriceRange[1]}
                    onChange={handleChangeMaxPrice}
                    inputMode="numeric"
                    slotProps={{
                        htmlInput: {
                            step: 0.1,
                            min: 0.0,
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default PlayerFilters;
