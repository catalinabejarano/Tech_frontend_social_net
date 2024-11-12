import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Global } from  '../helpers/Global';

export const useFetchDataId = (endpoint, valueId ) => {
  
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [dataId, setDataId] = useState([]);

  useEffect(() => {
    const fetchDataAnimal = async () => {
      try {
        

        // Token cargado del usuario
        const token = localStorage.getItem("token");
        const url = `${Global.url}${endpoint}${valueId}`;
        console.log(url);    /////////////////////////////////////////////
        
        //Realizar consulta de registro desde la API por Id
        const requestApi = await fetch(url, {
            method: 'GET',
            headers: {
             "Content-Type": "application/json",
             "Authorization": token
            }
          });
      
        // Obtener la información retornada por el backend
        const data = await requestApi.json();
        console.log(data.publication);    /////////////////////////////////////

        /*
        if (!data) {
          throw new Error(`Error detectado: ${requestApi.statusText}`);
        }
     */
        //Almaceno la  informacion detallada de respuesta de solicitud 
       
        setMessage(data.message);
        setDataId (data.publication)

      } catch (err) {
        setError(err.message);
      } 
    };

    fetchDataAnimal();
  }, [endpoint, valueId, message]);

  return {error, message, dataId};
  
};

useFetchDataId.propTypes = {
  endpoint: PropTypes.string,
  valueId: PropTypes.string

};
 export  default useFetchDataId;
