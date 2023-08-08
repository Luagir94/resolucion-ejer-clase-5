import React, { useContext, useEffect, useRef, useState } from "react";
import propTypes from "prop-types";
import { ContextoFormulario } from "../../context/ContextoFormulario";

const Input = ({
  name,
  label,
  type = "text",
  shouldFocus = false,
  isPokemon = false,
  options = [],
}) => {
  const ref = useRef();

  const { handleInputBlur, formulario } = useContext(ContextoFormulario);

  const [value, setValue] = useState(formulario[name] || "");

  /**
   * Función que se ejecuta al cambiar el valor del input.
   *
   * @param {Event} e
   */
  const onChange = (e) => setValue(e.target.value);

  /**
   * Función que se ejecuta al perder el foco del input.
   *
   * @param {Event} e
   */
  const onBlur = (e) => {
    e.preventDefault();

    handleInputBlur(
      isPokemon ? "ACTUALIZAR_POKEMON" : "ACTUALIZAR_ENTRENADOR",
      {
        campo: name,
        valor: value,
      }
    );
  };

  useEffect(() => {
    if (ref.current && shouldFocus) {
      ref.current.focus();
    }
  }, [shouldFocus]);


  if (type === "select") {
  return(
    <div className="input-contenedor">
      <label htmlFor={name}>{label}</label>
      <select
        type={type}
        value={value}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
)
  }

  return (
    <div className="input-contenedor">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    </div>
  );
};

Input.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  type: propTypes.string,
  shouldFocus: propTypes.bool,
  isPokemon: propTypes.bool,
  options: propTypes.array,
};

export default Input;
