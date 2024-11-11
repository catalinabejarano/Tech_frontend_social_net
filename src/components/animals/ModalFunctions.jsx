import PropTypes from "prop-types";
import { useDeleteRegister } from "../../hooks/useDeleteRegister";
import  { useContext, useEffect } from 'react';
import { RenderContext } from "../../context/RenderContext";

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
  
  
  // Componente Modal para la actualizacion de registro
  function ModalUpdate({ showUpdate, closeModalUpdate, executeActionUpdate }) {
    if (!showUpdate) return null; // No renderiza el modal si "showUpdate" es falso
  
    return (
      <div className="overlay_update">
        <div className="modal_update">
          <h3>Confirmar edición de registro del animal rescatado?</h3>
          <br/>
          <div>
            <button  onClick={executeActionUpdate}>Confimar</button>
            <button  onClick={closeModalUpdate}>Cancelar</button>
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
       text ="Error conexión BD" + error
    
  } 
   return <div className="eliminated_register">{text}</div>; 
  
  }
  
  
  // Función que se ejecutará si la respuesta es "Sí" para actualizar registro de Animal Rescatado
  function ActionUpdate({valueId}) {

    const { updateRegisterAnimal } = useContext(RenderContext);

    useEffect(() => {
      const handleSendData = () => {
        updateRegisterAnimal(valueId);
      };
      
      handleSendData(); // Ejecuta la función inmediatamente cuando el componente se monta
    }, [updateRegisterAnimal, valueId]); // Dependencias necesarias
  
   
    return 
  }

  export { Modal, ModalUpdate, ComponenteAccion, ActionUpdate };
  
Modal.propTypes = {
  mostrar: PropTypes.bool.isRequired,     
  cerrarModal: PropTypes.func.isRequired, 
  ejecutarAccion: PropTypes.func.isRequired, 
  
};

ModalUpdate.propTypes = {
  showUpdate: PropTypes.bool.isRequired,     
  closeModalUpdate: PropTypes.func.isRequired, 
  executeActionUpdate: PropTypes.func.isRequired, 

}

ComponenteAccion.propTypes = {
  valueId:PropTypes.string
}

ActionUpdate.propTypes = {
  valueId:PropTypes.string
}