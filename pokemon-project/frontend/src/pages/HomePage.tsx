import { useState } from "react";
import PokemonPage from "./PokemonPage";
import SearchField from "./SearchField";

export default function HomePage(){

    const [searchText, setSearchText] = useState("")
    const [filter, setFilter] = useState("name")
    const [sortType, setSortType] = useState("num")
    const [order, setOrder] = useState("asc")

    return (
        <div>
            <SearchField setSearchText={setSearchText} setFilterText={setFilter} setSortType={setSortType} setOrder={setOrder}/>
            <PokemonPage text={searchText} filter={filter} offset={0} limit={15} sortType={sortType} order={order}/>
        </div>
    )
}