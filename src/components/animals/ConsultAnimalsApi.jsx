import PropTypes from 'prop-types';
import {  useState, useEffect } from "react";
import useFetchData from '../../hooks/useFetchData'
import ListCards from "./ListCards";
import Loading from '../../assets/images/loading.webp'
import "../../assets/css/consultapi.css"

const ConsultAnimalsApi = ({filterSpecie }) => {

  // Estado para la página actual
  const [page, setPage] = useState(1); 
  const { data, loading, error, totalpages, checkRole } = useFetchData('animal/animals-list/', page); //Array con Datos de los Animales Rescatados 

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  //Loop para verificar el Rol del Usuario y decidir si se visualizan en las tarjetas de animales los botones de Eliminar y Actualizar 
  let showButtons = false ;
  checkRole == "role_administratorf" ?  showButtons = true : showButtons = false ;

  // Maneja el retraso de 2 segundos para el loading
  const [delayedLoading, setDelayedLoading] = useState(false); // Estado para controlar el retraso del loading

  // Maneja el retraso de 2 segundos para el loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedLoading(loading);
    }, 2000); // Retraso de 2 segundos

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente o actualizar
  }, [loading]);
  if (delayedLoading) return <div className="navegacion"><img src= {Loading} className="loading"/></div>;

  //Error al consultar la Api Para redendrizar
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
       {data
        .filter((item) => !filterSpecie || item.species === filterSpecie) // Filtra según la especie
        .map((item) => (
          <ListCards
            key={item.id}
            imagen={item.image_url}
            name={item.name}
            habits={item.habits}
            species={item.species}
            age={parseInt(item.age)}
            gender={item.gender}
            showButtons={showButtons} 
            dataId={item.id}
           
          />
        ))};
      </main>
     
    </>
  );
};

// Validación de props usando PropTypes
ConsultAnimalsApi.propTypes = {
  filterSpecie: PropTypes.string,
}

export default ConsultAnimalsApi;
