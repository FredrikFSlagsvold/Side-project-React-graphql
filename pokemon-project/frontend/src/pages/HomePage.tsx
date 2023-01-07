import { useState } from "react";
import PokemonPage from "./PokemonPage";
import SearchField from "./SearchField";

//knytter Søkefunksjonaliteten sammen med Query. searchText, filter, sortType og order (sort) blir definert i Searchfield.
//Disse variablene blir så satt inn som variabler(props) i PokemonPage og setter i gang queries.

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