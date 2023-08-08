import React from "react";
import { Link } from "react-router-dom";
import ProviderFormulario from "../../context/ContextoFormulario";
import pokebola from "../../assets/pokebola.png";
import entrenador from "../../assets/entrenador.png";
import pikachu from "../../assets/pikachu.png";
import Input from "../Input/Input";
import Detalle from "./Detalle";
import { useQuery } from '@tanstack/react-query'

/**
 * Componente que muestra los inputs del formulario.
 *
 * @returns {JSX.Element}
 */
const Formulario = () => {
  const { isLoading : typeLoading , error : typeError , data : typeData } = useQuery(['pokemonTypes'], () =>
    fetch('https://pokeapi.co/api/v2/type').then(res =>
      res.json()
    ).then(data => data.results.map((item) => item.name)))

    
  const { isLoading : pokemonLoading , error : pokemonError , data : pokemonData } = useQuery(['pokemon'], () =>
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151').then(res =>
      res.json()
    ).then(data => data.results.map((pokemon) => pokemon.name)))

  

  return (
    <>
      <header className="form-header">
        <div>
          <img src={pokebola} alt="pokebola" />
          <h2>Centro Pokemon de Ash</h2>
        </div>
        <Link className="volver" to="/">
          Home
        </Link>
      </header>
      <div className="formulario-ingreso">
        <h3>Solicitud de atención</h3>
        <p>
          Por favor, completa el formulario para que podamos atender a tu
          pokémon
        </p>
        <div className="cuerpo-formulario">
          <ProviderFormulario>
            <div className="inputs">
              <div>
                <p className="nombre-seccion">
                  <img src={entrenador} alt="entrenador" />
                  <span>ENTRENADOR</span>
                </p>
                <Input name="nombre" label="Nombre" shouldFocus={true} />
                <Input name="apellido" label="Apellido" />
                <Input name="email" label="Email" type="email" />
              </div>
              <div>
                <p className="nombre-seccion">
                  <img src={pikachu} alt="pikachu" />
                  <span>POKEMON</span>
                </p>
                <Input name="nombrePokemon" 
                label="Nombre" 
                isPokemon={true} 
                options={pokemonData}
                type="select"
                />
                <Input name="tipoPokemon" 
                label="Tipo"
                 isPokemon={true}
                  type="select"
                  options={typeData}
                  
                  
                 />
                <Input
                  name="elementoPokemon"
                  label="Elemento"
                  isPokemon={true}
                />
                <Input name="alturaPokemon" label="Altura" isPokemon={true} />
                <Input name="edadPokemon" label="Edad" isPokemon={true} />
              </div>
            </div>
            <Detalle />
          </ProviderFormulario>
        </div>
      </div>
    </>
  );
};

Formulario.propTypes = {};

export default Formulario;
