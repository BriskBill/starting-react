import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import "./App.css";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select</button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {
        Object.keys(base).map(key => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))
      }
    </table>
  </div>
)

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};

const Title = styled.h1`
  text-align: center;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;
const Container = styled.div`
  margin: auto;
  width: 800;
  padding-top: 1rem;
`;
const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

function App() {
  const [filter, setFilter] = React.useState("");
  const [pokemon, setPokemon] = React.useState([]);
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then(resp => resp.json())
      .then(data => setPokemon(data));
  }, []);

  return (
    <Container>
      <Title>Pokemon Search</Title>
      <Input
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <TwoColumnLayout>
        <div>
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
                .filter((pokemon) => 
                  pokemon.name.english.toLowerCase().includes(filter)
                )
                .slice(0, 20)
                .map(pokemon => (
                <PokemonRow
                  key={pokemon.id}
                  pokemon={pokemon}
                  onSelect={(pokemon) => setSelectedPokemon(pokemon)}
                />
              ))}
            </tbody>
          </table>
        </div>
        {selectedPokemon && (
          <PokemonInfo {...selectedPokemon} />
        )}
      </TwoColumnLayout>
    </Container>
  );
}

export default App;
