import { useMemo } from "react";
import { TextField, debounce } from "@mui/material";

type searchFieldProps = {
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchField( { setSearchText }: searchFieldProps){

    const changeHandler = (event: any) => {
        const search = event.target.value;
        setSearchText(search);
    }

    const debouncedEventHandler = useMemo(
        () => debounce(changeHandler, 400), []);

    return (
        <div>
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={debouncedEventHandler} />
        </div>
    )
}