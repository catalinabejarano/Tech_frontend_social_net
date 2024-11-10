import { useState } from 'react';
import PropTypes from "prop-types";

// Componente que se ejecutará si la respuesta es "Sí"
function ComponenteAccion() {
  return <div>¡La acción se ha ejecutado!</div>;
}

// Componente Modal
function Modal({ mostrar, cerrarModal, ejecutarAccion }) {
  if (!mostrar) return null; // No renderiza el modal si "mostrar" es falso

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>¿Quieres ejecutar la acción?</h3>
        <div>
          <button onClick={ejecutarAccion}>Sí</button>
          <button onClick={cerrarModal}>No</button>
        </div>
      </div>
    </div>
  );
}

// Componente principal
function Test() {
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

  return (
    <div>
      <button onClick={abrirModal}>Abrir Modal</button>

      {/* Mostrar el componente de acción solo si se ejecutó */}
      {accionEjecutada && <ComponenteAccion />}

      <Modal 
        mostrar={mostrarModal} 
        cerrarModal={cerrarModal} 
        ejecutarAccion={ejecutarAccion} 
      />
    </div>
  );
}

// Estilos en línea para el modal
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
};


// Validación de las props usando PropTypes
Modal.propTypes = {
    mostrar: PropTypes.bool.isRequired,      // "mostrar" debe ser un booleano y es obligatorio
    cerrarModal: PropTypes.func.isRequired,  // "cerrarModal" debe ser una función y es obligatorio
    ejecutarAccion: PropTypes.func.isRequired, // "ejecutarAccion" debe ser una función y es obligatorio
  };

export default Test;