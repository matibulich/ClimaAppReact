import { useState } from "react";

export const useClima = () => {
  const url = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "380cf6f55108045999a811d89e00e6e4";

  const [clima, setClima] = useState(null);
  const [error, setError] = useState(null);

  const fetchClima = async (ciudad, units = "metric") => {
    try {
      const response = await fetch(
        `${url}?q=${ciudad}&units=${units}&lang=es&appid=${apiKey}`
      );
      const data = await response.json();

      if (response.ok) {
        setClima(data);
        setError(null);
      } else {
        setClima(null);
        setError("Ciudad no encontrada");
      }
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error al buscar el clima.");
    }
  };

  return { clima, error, fetchClima };
};
