import { useState, useEffect } from "react";

const Filtros = ({ filtro, setFiltro }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="categoria">Filtrar gasto: </label>
          <select
            id="categoria"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="">-- Todas las Categorías --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="ocio">Ocio</option>
            <option value="suscripciones">Suscripciones</option>
            <option value="salud">Salud</option>
            <option value="gastosVarios">Gastos varios</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filtros;
