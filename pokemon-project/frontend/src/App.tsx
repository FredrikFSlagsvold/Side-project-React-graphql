import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SoloPokemonPage from "./pages/SoloPokemonPage";
import './styles/PokemonStyles.css';


function App() {

  return (
    <Router>
      <div className="App">
        <h1 className="pageHeader">Pokémon</h1>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/pokemon/:pokemonName" element={<SoloPokemonPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
