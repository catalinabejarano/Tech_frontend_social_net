import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Global } from  '../helpers/Global';

const useFetchData = (endpoint, page ) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalpages, setTotalpages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {

        setLoading(true);
        const response = await fetch(`${Global.url}${endpoint}${page}`);

        if (!response.ok) {
          throw new Error(`Error detectado: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result.animals || []);
        setTotalpages(parseInt(result.pages));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, page , totalpages]);

  return { data, loading, error, totalpages};
  
};

useFetchData.propTypes = {
  endpoint: PropTypes.string,
  page: PropTypes.number

};

export default useFetchData;