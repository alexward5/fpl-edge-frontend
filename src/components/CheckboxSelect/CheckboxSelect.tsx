import { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 240,
        },
    },
};

export default function MultipleSelectCheckmarks(props: any) {
    const { listItems, label } = props;

    // Track the original order of the list so it can be maintained
    const listOrder: Record<string, number> = {};
    listItems.forEach((listItem: string, index: number) => {
        listOrder[listItem] = index;
    });

    const [selectedList, setSelectedList] = useState<string[]>([]);

    useEffect(() => {
        setSelectedList(listItems);
    }, [listItems]);

    const handleChange = (event: SelectChangeEvent<typeof selectedList>) => {
        const value = event.target.value;
        setSelectedList(
            // On autofill we get a stringified value
            typeof value === "string" ? value.split(",") : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ width: "100%", paddingBottom: "20px" }}>
                <InputLabel id="multiple-checkbox-label">Position</InputLabel>
                <Select
                    labelId="multiple-checkbox-label"
                    id="multiple-checkbox"
                    multiple
                    value={selectedList}
                    onChange={handleChange}
                    input={<OutlinedInput label={label} />}
                    renderValue={(selected) => {
                        const selectedLen = selected.length;
                        if (selectedLen > 3) {
                            return `${selectedLen} Selected`;
                        }

                        return selected
                            .sort((a, b) => {
                                return listOrder[a] - listOrder[b];
                            })
                            .join(", ");
                    }}
                    MenuProps={MenuProps}
                >
                    {listItems.map((listItem: string) => (
                        <MenuItem key={listItem} value={listItem}>
                            <Checkbox
                                checked={selectedList.includes(listItem)}
                            />
                            <ListItemText primary={listItem} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
