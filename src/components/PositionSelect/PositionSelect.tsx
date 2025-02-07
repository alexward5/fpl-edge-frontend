import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function PositionSelect() {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    };

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        defaultChecked
                        onChange={handleChange}
                        value={"DEF"}
                    />
                }
                label="DEF"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        defaultChecked
                        onChange={handleChange}
                        value={"MID"}
                    />
                }
                label="MID"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        defaultChecked
                        onChange={handleChange}
                        value={"FWD"}
                    />
                }
                label="FWD"
            />
        </FormGroup>
    );
}
