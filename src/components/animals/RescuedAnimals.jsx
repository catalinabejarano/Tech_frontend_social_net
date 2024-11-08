import  { useState } from "react";
import ConsultAnimalsApi from "./ConsultAnimalsApi";
import {AnimalsRegisterUpload} from "./AnimalsRegisterUpload";

export const RescuedAnimals = () => {
  // Estado para controlar el componente activo
  const [activeComponent, setActiveComponent] = useState("consult"); // 'consult' o 'register'

  // Funciones para manejar la selección del componente a mostrar
  const showConsult = () => setActiveComponent("consult");
  const showRegister = () => setActiveComponent("register");

  return (
    <> 
      <header className="rescatados">
        <h1 className="content__title">Animales Rescatados</h1>
      </header>

      {/* Botones para alternar entre componentes */}
      <div className="button-group" id="buttonsmenuanimals">
        <button onClick={showConsult} id="buttonanimals" className={activeComponent === "consult" ? "active" : ""}>
          Consultar
        </button>
        <button onClick={showRegister} id="buttonanimals"  className={activeComponent === "register" ? "active" : ""}>
          Registrar
        </button>
      </div>

      {/* Renderizado condicional de componentes */}
      <div className="component-display">
        {activeComponent === "consult" && <ConsultAnimalsApi />}
        {activeComponent === "register" && <AnimalsRegisterUpload />}
      </div>
    </>
  );
};


