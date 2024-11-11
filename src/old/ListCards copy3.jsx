//import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import "../../assets/css/consultapi.css"
import {useDeleteRegister} from "../../hooks/useDeleteRegister";



// Componente Modal para Eliminación
function Modal({ mostrar, cerrarModal, ejecutarAccion }) {
  if (!mostrar) return null; // No renderiza el modal si "mostrar" es falso

  return (
    <div className="overlay">
      <div className="modal">
        <h3>¿Quieres confirmar la eliminación del registro del animal rescatado de la base de datos de la fundación?</h3>
        <br/>
        <div>
          <button className="modal_button_yes" onClick={ejecutarAccion}>Sí</button>
          <button className="modal_button_not" onClick={cerrarModal}>No</button>
        </div>
      </div>
    </div>
  );
}

// Función que se ejecutará si la respuesta es "Sí" para eliminar registro de Animal Rescatado
function ComponenteAccion({valueId}) {
 
 const endpointurl ="animal/delete-rescued-animal/"; 

 const {error, message} = useDeleteRegister(endpointurl, valueId);

 let text ="";
switch (message) {
  case "deleted":
    text = "Registro eliminado"
    break;
  case "undeleted":
    text = "Registro no encontrado" 
    break;
  case "Sin privilegios":
    text = "No es Administrador"
    break;
  default: 
     text ="Error conexion BD"  + error
  
}
 return <div className="eliminated_register">{text}</div>;
}

const ListCards = ({ imagen, name, habits, age, gender, showButtons, dataId}) => {

   
  //Ver los datos en el campo Habitos de las tarjetas, inicialmente esta oculto
  const [show, setShow] = useState(false);


  //Ajustar el texto que acompaña alos años en singular o plural
  const años = age < 2 ? "año" :  "años" ;

  //Ajustar la Primera Letra de cada "Prop" a mayuscula antes de Renderizarla
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };
  
  const capitalizeEachWord = (text) => {
    const words = text.split(" ");
    const wordsCapitalized = words.map(word => capitalize(word));
    return wordsCapitalized.join(" ");
  };

  //Ejecucion del Modal para realizar eliminacion del Registro del Animal  /////
  const [mostrarModal, setMostrarModal] = useState(false);
  const [accionEjecutada, setAccionEjecutada] = useState(false);  

   // Función para abrir el modal
   const abrirModal = () => {
    setMostrarModal(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setMostrarModal(false);
  };

  // Función que se ejecuta si se selecciona "Sí"
  const ejecutarAccion = () => {
    setAccionEjecutada(true);
    cerrarModal(); // Cierra el modal después de ejecutar la acción
  };

  /*

  //Ejecucion del Modal para realizar actualizacion del Registro del Animal  /////
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [executeActionUpdate, setExecuteActionUpdate] = useState(false);  

   // Función para abrir el modal
   const openModalUpdate = () => {
    setShowModalUpdate(true);
  };

  // Función para cerrar el modal
  const closeModalUpdate = () => {
    setShowModalUpate(false);
  };

  // Función que se ejecuta si se selecciona "Sí"
  const executeActionUpdate = () => {
    setExecuteActionUpdate(true);
    closeModalUpdate(); // Cierra el modal después de ejecutar la acción
  };
*/

  return (
    <>
      <div className="card text-center" style={{ width: "18rem" }}>
        <div className="overflow2">
          <img src={imagen} id="adjustimage" className="card-imagen-top" alt={name} title={capitalizeEachWord(name)} />
           {/* Mostrar el componente de acción solo si se ejecutó */}
           {accionEjecutada && <ComponenteAccion valueId={dataId} />}
        </div>
        <div className="card-body">
          <div className="card-body-sectionone">
            <div className="data_cards">
             <br/>
             <h5 className="card-title">Nombre: {capitalizeEachWord(name)}</h5>
             <h5 className="card-title">Edad: {age} {capitalizeEachWord(años)}</h5>
             <h5 className="card-title">Genero: {capitalizeEachWord(gender)}</h5>
             <h5 hidden >{dataId}</h5>
            </div>
        
          {/* Visualizar los botones solo si el usuario es Administrador*/}
            <div>    
            {showButtons && (
              <div className="card-buttons">
              <button className="fa-solid fa-pen-to-square" 
                 
                id="button_update" 
                alt="Actualizar Datos">
               </button>
              <button
                onClick={abrirModal}                
                className= "fa-solid fa-trash" 
                id="button_delete" 
                alt="Eliminar">
                </button>
              </div>
             
            )}
            </div>
           

            <Modal 
            mostrar={mostrarModal} 
            cerrarModal={cerrarModal} 
            ejecutarAccion={ejecutarAccion} 
             />

          </div>
          <div className="grid">
            <button
              className="details btn btn-info"
              id="button_details"  
              type="button"
              onClick={() => {
                setShow(!show);
              }}
            >
              Habitos {show ? "-" : "+"}
            </button>
            <hr></hr>

            {show ? (
              <div style={{ color: "black" }}>{habits}</div>
            ) : (
              <div style={{ color: "blue" }}>
                <p>               
                </p>
              </div>
            )}
          </div>
         
        </div>
      </div>
    </>
  );
};

ListCards.propTypes = {
  imagen: PropTypes.string,
  habits: PropTypes.array,
  name:PropTypes.string,
  age:PropTypes.number,
  gender:PropTypes.string,
  showButtons: PropTypes.bool,
  dataId:PropTypes.string,
};

Modal.propTypes = {
  mostrar: PropTypes.bool.isRequired,     
  cerrarModal: PropTypes.func.isRequired, 
  ejecutarAccion: PropTypes.func.isRequired, 
  
};

ComponenteAccion.propTypes = {
    valueId:PropTypes.string
}
export default ListCards;
