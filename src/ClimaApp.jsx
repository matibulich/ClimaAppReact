import { useState, useRef, useEffect } from "react";
import { Units } from "./components/Units";
import { useClima } from "./hook/useClima";

export const ClimaApp = () => {


  const [ciudad, setCiudad] = useState("");
  const [units, setUnits] = useState("metric");
  
  

  const { clima, error, fetchClima } = useClima();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus(); // Hacer foco al montar el componente
  }, []);
   

  const handleCiudad = (e) => {
    console.log(e);
    setCiudad(e.target.value);
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima(ciudad);
  };

  const handleUnits = (newUnits) => {
    setUnits(newUnits); // Actualizamos las unidades
  };

  // Ejecutar fetchClima cuando cambian las unidades, si ya hay una ciudad seleccionada
  useEffect(() => {
    if (ciudad) {
      fetchClima(ciudad);
    }
  }, [units]); // Este efecto depende de "units"
  return (
    <>
      <div className="container">
        <h1>Clima App</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={ciudad}
            onChange={handleCiudad}
            ref={inputRef}
          />

          <button type="submit">Buscar</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {clima && (
          <div>
            <h1>Actual</h1>
            <h2>{clima.sys.country} </h2>
            <h2> {clima.name} </h2>
            <p>
              Temperatura : {clima.main?.temp}{" "}
              {units === "metric" ? "°C" : "°F"}
            </p>
   {ciudad && clima &&(
    <Units units={units} handleUnits={handleUnits} />
    )}
            <p> Cielo : {clima.weather[0].description} </p>
            <img
              src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
          </div>
        )}

        
      </div>
    </>
  );
};
