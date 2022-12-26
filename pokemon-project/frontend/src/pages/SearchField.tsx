import { useMemo } from "react";
import { TextField, debounce, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type searchFieldProps = {
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    setFilterText: React.Dispatch<React.SetStateAction<string>>;
    setSortType: React.Dispatch<React.SetStateAction<string>>;
    setOrder: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchField( { setSearchText, setFilterText, setSortType, setOrder }: searchFieldProps){

    const textChangeHandler = (event: any) => {
        const search = event.target.value;
        setSearchText(search);
    }

    const filterChangeHandler = (event: any) => {
        const filter = event.target.value;
        setFilterText(filter);
    }

    const sortTypeChangeHandler = (event: any) => {
        const sortType = event.target.value;
        setSortType(sortType);
    }

    const orderByChangeHandler = (event: any) => {
        const order = event.target.value;
        setOrder(order);
    }

    const debouncedEventHandler = useMemo(
        () => debounce(textChangeHandler, 450), []);

    return (
        <div style={{display: "flex", margin: "20px", justifyContent: "center"}}>

            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={debouncedEventHandler} />

            <FormControl>
                <InputLabel sx={{ marginLeft: "10px" }}>Search By</InputLabel>
                <Select
                    id="CategorySelector"
                    label="filterCategory"
                    defaultValue={"name"}
                    onChange={filterChangeHandler}
                    sx={{ width:'30%', minWidth:"150px", marginLeft: "10px"}}
                    >

                    <MenuItem value={"name"}>Name</MenuItem>
                    <MenuItem value={"type"}>Type</MenuItem>
                    <MenuItem value={"num"}>Num</MenuItem>
                    <MenuItem value={"weaknesses"}>Weaknesses</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel sx={{ marginLeft: "10px" }}>Sort By</InputLabel>
                <Select
                    id="sortTypeField"
                    label="sortTypeField"
                    defaultValue={"num"}
                    onChange={sortTypeChangeHandler}
                    sx={{ width:'30%', minWidth:"150px", marginLeft: "10px"}}
                    >

                    <MenuItem value={"num"}>Number</MenuItem>
                    <MenuItem value={"name"}>Name</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel sx={{ marginLeft: "10px" }}>Order By</InputLabel>
                <Select
                    id="orderField"
                    label="orderField"
                    defaultValue={"asc"}
                    onChange={orderByChangeHandler}
                    sx={{ width:'30%', minWidth:"150px", marginLeft: "10px"}}
                    >

                    <MenuItem value={"asc"}>Ascending</MenuItem>
                    <MenuItem value={"desc"}>Descending</MenuItem>
                </Select>
            </FormControl>
            
        </div>
    )
}