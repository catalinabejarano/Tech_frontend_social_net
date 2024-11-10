import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Global } from  '../helpers/Global';

export const useDeleteRegister = (endpoint, valueId ) => {
  
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDataAnimal = async () => {
      try {

        // Token cargado del usuario
        const token = localStorage.getItem("token");
        const url = `${Global.url}${endpoint}${valueId}`;
        
        //Realizo delete al registro desde la API
        const requestApi = await fetch(url, {
            method: 'DELETE',
            headers: {
             "Content-Type": "application/json",
             "Authorization": token
            }
          });
      
        // Obtener la información retornada por el backend
        const data = await requestApi.json();

        /*
        if (!data) {
          throw new Error(`Error detectado: ${requestApi.statusText}`);
        }
     */
        //Chequeo informacion detallada de respuesta de solicitud 
        const result = data.deleteRegister;
        setMessage(result);

      } catch (err) {
        setError(err.message);
      } 
    };

    fetchDataAnimal();
  }, [endpoint, valueId, message]);

  return {error, message};
  
};

useDeleteRegister.propTypes = {
  endpoint: PropTypes.string,
  valueId: PropTypes.string

};

