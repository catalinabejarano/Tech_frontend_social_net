import PropTypes from 'prop-types';
import {  useState } from "react";
import useFetchData from '../hooks/useFetchData'
import ListCards from "../components/animals/ListCards";
import Loading from '../../assets/images/loading.webp'
import "../../assets/css/consultapi.css"

const ConsultAnimalsApi = ({filtergender}) => {
  const [page, setPage] = useState(1); // Estado para la página actual
  const { data, loading, error, totalpages } = useFetchData('animal/animals-list/', page); //Array con Datos de los Animales Rescatados 

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));


  if (loading) return <div className="navegacion"><img src= {Loading} className="loading"/></div>;
  if (error) return <p>Error Consulta de la Api: {error}</p>;

  const total = parseInt(totalpages); 

  return (
    <>  
         <div className="navegacion">
            <button className="buttons__direction--left" onClick={handlePrevPage} disabled={page === 1}>
             Atrás
            </button>
            <span>Página {page}</span>
            <button className="buttons__direction--right" onClick={handleNextPage} disabled={page === total }>
            Adelante
            </button>
            </div>
  
      <main className="container">  
         
          
          
          
          
          
          {data.map((item) => (
          <ListCards
            key={item.id}
            imagen={item.image_url}
            name={item.name}
            habits={item.habits}
            age={parseInt(item.age)}
            gender={item.gender}
          />
        ))}
     
      </main>
     
    </>
  );
};

// Validación de props usando PropTypes
ConsultAnimalsApi.propTypes = {
  gender: PropTypes.string,  
};


// Validación de props usando PropTypes
ConsultAnimalsApi.propTypes = {
  filtergender: PropTypes.string
}

export default ConsultAnimalsApi;
