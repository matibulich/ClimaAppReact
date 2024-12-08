import { useState, useEffect } from "react";

export const Units = ({ units, handleUnits }) => {
  const [localUnits, setLocalUnits] = useState(units); // Estado local de las unidades

  // Efecto para propagar cambios cuando el estado local cambia
  useEffect(() => {
    handleUnits(localUnits); // Propagar el cambio al componente padre
  }, [localUnits, handleUnits]);

  return (
    <form className="units">
      <select
        name="units"
        value={localUnits}
        onChange={(e) => setLocalUnits(e.target.value)} // Actualizar el estado local
      >
        <option value="metric">Celsius</option>
        <option value="imperial">Fahrenheit</option>
      </select>
    </form>
  );
};
