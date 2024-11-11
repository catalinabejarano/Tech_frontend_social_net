import  { useState , useContext } from "react";
import ConsultAnimalsApi from "./ConsultAnimalsApi";
import {AnimalsRegisterUpload} from "./AnimalsRegisterUpload";
import { RenderContext } from "../../context/RenderContext";



export const RescuedAnimals = () => {
  // Estado para controlar el componente activo
  const [activeComponent, setActiveComponent] = useState("consult"); //

  // Funciones para manejar la selección del componente a mostrar
  const showConsult = () => setActiveComponent("consult");
  const showRegister = () => setActiveComponent("register");
  const showDogs = () => setActiveComponent("dogsconsult");
  const showCats = () => setActiveComponent("catsconsult");

  const { childData } = useContext(RenderContext);
 



  return (
    <> 
      <header className="rescatados">
        <h1 className="content__title">Animales Rescatados</h1>
        <p>Datos recibidos del hijo: {childData}</p>
      </header>

      {/* Botones para alternar entre componentes */}
      <div className="button-group" id="buttonsmenuanimals">
       <div >
          <button onClick={showDogs} id="buttonanimals" className={activeComponent === "dogsconsult" ? "active" : ""}>
            Perros
          </button>
          <button onClick={showCats} id="buttonanimals"  className={activeComponent === "catsconsult" ? "active" : ""}>
            Gatos
          </button>
       </div>
       <div> 
          <button onClick={showConsult} id="buttonanimals" className={activeComponent === "consult" ? "active" : ""}>
          Consultar
          </button>
          <button onClick={showRegister} id="buttonanimals"  className={activeComponent === "register" ? "active" : ""}>
          Registrar
          </button>
        </div>
      </div>

      {/* Renderizado condicional de componentes */}
      <div className="component-display">
        {activeComponent === "delete" && <ConsultAnimalsApi />}
        {activeComponent === "consult" && <ConsultAnimalsApi />}
        {activeComponent === "register" && <AnimalsRegisterUpload />}
        {activeComponent === "dogsconsult" && <ConsultAnimalsApi filterSpecie="perro" />}
        {activeComponent === "catsconsult" && <ConsultAnimalsApi filterSpecie="gato" />}
        
      </div>
    </>
  );
};


