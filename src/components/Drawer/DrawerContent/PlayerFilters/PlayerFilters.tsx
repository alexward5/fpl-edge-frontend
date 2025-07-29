import Box from "@mui/material/Box";
import CheckboxSelect from "../../../CheckboxSelect/CheckboxSelect";
import TextField from "@mui/material/TextField";

type Props = {
    displayedPositions: string[];
    setDisplayedPositions: React.Dispatch<React.SetStateAction<string[]>>;
    playerPriceRange: string[];
    handleChangeMinPrice: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeMaxPrice: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PlayerFilters: React.FC<Props> = ({
    displayedPositions,
    setDisplayedPositions,
    playerPriceRange,
    handleChangeMinPrice,
    handleChangeMaxPrice,
}) => (
    <Box
        sx={{
            width: "100%",
            padding: "15px 15px 10px 15px",
        }}
    >
        <CheckboxSelect
            listItems={["DEF", "MID", "FWD"]}
            label="Position"
            selectedList={displayedPositions}
            setSelectedList={setDisplayedPositions}
        />
        <Box
            sx={{
                width: "100%",
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <TextField
                label="Min Price"
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
                sx={{
                    width: "48%",
                }}
            />
            <TextField
                label="Max Price"
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
                sx={{
                    width: "48%",
                }}
            />
        </Box>
    </Box>
);

export default PlayerFilters;
