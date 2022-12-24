import { useMemo } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, debounce } from "@mui/material";

type searchFieldProps = {
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchField( {setSearchText}: searchFieldProps){

    const changeHandler = (event: any) => {
        const search = event.target.value;
        setSearchText(search);
        console.log(event.target.value);
    }

    const debouncedEventHandler = useMemo(
        () => debounce(changeHandler, 400), []);

    return (
        <div>
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={debouncedEventHandler} />
            <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"Type"}
                    label="Type"
                >
                    <MenuItem value={"Grass"}>Grass</MenuItem>
                    <MenuItem value={"Electric"}>Electric</MenuItem>
                    <MenuItem value={"Water"}>Water</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}