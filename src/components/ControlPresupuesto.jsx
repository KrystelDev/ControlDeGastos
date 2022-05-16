import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  presupuesto,
  setPresupuesto,
  gastos,
  setGastos,
  setIsValidPresupuesto,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;
    const porcentajeNuevo = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setGastado(totalGastado);
    setDisponible(totalDisponible);

    setTimeout(() => {
      setPorcentaje(porcentajeNuevo);
    }, 1500);
  }, [gastos]);

  const FormatearMondea = (cantidad) => {
    return cantidad.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
    });
  };

  const handelResetApp = () => {
    const resultado = confirm("¿Deseas reiniciar presupuesto y gastos?");

    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? `#DC2626` : `#3B82F6`,
            trailColor: "#f5f5f5",
            textColor: porcentaje > 100 ? `#DC2626` : `#3B82F6`,
          })}
          text={`${porcentaje}% Gastado`}
          value={porcentaje}
        ></CircularProgressbar>
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handelResetApp}>
          Resetear todo
        </button>
        <p>
          <span>Presupuesto:</span> {FormatearMondea(presupuesto)}
        </p>
        <p className={`${disponible}` < 0 ? "negativo" : ""}>
          <span>Disponible:</span> {FormatearMondea(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {FormatearMondea(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
