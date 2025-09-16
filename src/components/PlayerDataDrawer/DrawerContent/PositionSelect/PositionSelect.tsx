import { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

const PLAYER_POSITIONS = ["DEF", "MID", "FWD"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

type Props = {
    selectedList: string[];
    setSelectedList: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function PositionSelect(props: Props) {
    const { selectedList, setSelectedList } = props;

    // Track the original order of the list so it can be maintained
    const listOrder: Record<string, number> = {};
    PLAYER_POSITIONS.forEach((listItem: string, index: number) => {
        listOrder[listItem] = index;
    });

    useEffect(() => {
        setSelectedList(PLAYER_POSITIONS);
    }, []);

    const handleChange = (event: SelectChangeEvent<typeof selectedList>) => {
        const value = event.target.value;
        setSelectedList(
            // On autofill we get a stringified value
            typeof value === "string" ? value.split(",") : value,
        );
    };

    return (
        <Box>
            <FormControl sx={{ width: "100%" }}>
                <Typography variant="subtitle1" fontWeight={"bold"}>
                    Positions
                </Typography>
                <Select
                    labelId={"position-select"}
                    id={"position-select"}
                    multiple
                    value={selectedList}
                    onChange={handleChange}
                    renderValue={(selected) => {
                        return selected
                            .sort((a: string, b: string) => {
                                return listOrder[a] - listOrder[b];
                            })
                            .join(", ");
                    }}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                            },
                        },
                    }}
                >
                    {PLAYER_POSITIONS.map((listItem: string) => (
                        <MenuItem key={listItem} value={listItem}>
                            <Checkbox
                                checked={selectedList.includes(listItem)}
                            />
                            <ListItemText primary={listItem} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
