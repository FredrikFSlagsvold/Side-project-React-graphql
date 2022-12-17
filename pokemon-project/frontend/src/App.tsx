import HomePage from "./pages/HomePage";
import SearchField from "./pages/SearchField";

function App() {
  return (
    <div className="App">
      <h1 style={{fontFamily: "verdana, sans-seriff", textAlign: "center", backgroundColor: "red", color: "white"}}>Pokémon</h1>
      <SearchField />
      <HomePage />
    </div>
  );
}

export default App;
