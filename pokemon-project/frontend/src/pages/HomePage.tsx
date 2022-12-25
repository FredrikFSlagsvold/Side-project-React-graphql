import { useState } from "react";
import PokemonPage from "./PokemonPage";
import SearchField from "./SearchField";

export default function HomePage(){

    const [searchText, setSearchText] = useState("")
    const [filter, setFilter] = useState("name")
    console.log(searchText)

    return (
        <div>
            <SearchField setSearchText={setSearchText}/>
            <PokemonPage text={searchText} filter={filter} offset={0} limit={15}/>
        </div>
    )
}