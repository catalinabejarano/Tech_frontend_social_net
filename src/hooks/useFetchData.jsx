import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Global } from  '../helpers/Global';

const useFetchData = (endpoint, page ) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalpages, setTotalpages] = useState(0);
  const [checkRole, setCheckRole] = useState("role_user");

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Token cargado del usuario
        const token = localStorage.getItem("token");

        setLoading(true);
        const response = await fetch(`${Global.url}${endpoint}${page}`, {
            method: 'GET',
            headers: {
             "Content-Type": "application/json",
             "Authorization": token
            }
          });
      

        if (!response.ok) {
          throw new Error(`Error detectado: ${response.statusText}`);
        }

        const result = await response.json();

        //Chequeo role del UserId logueado para habilitar funciones de Eliminación y Actualización de Animales Registrados si es Adminsitrador
        const checkingRole = result.roleuser;
        //console.log(checkingRole);

        setData(result.animals || []);
        setTotalpages(parseInt(result.pages));
        setCheckRole(checkingRole);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, page , totalpages, checkRole]);

  return { data, loading, error, totalpages, checkRole};
  
};

useFetchData.propTypes = {
  endpoint: PropTypes.string,
  page: PropTypes.number

};

export default useFetchData;