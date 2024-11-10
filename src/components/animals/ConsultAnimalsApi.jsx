import PropTypes from 'prop-types';
import {  useState } from "react";
import useFetchData from '../../hooks/useFetchData'
import ListCards from "./ListCards";
import Loading from '../../assets/images/loading.webp'
import "../../assets/css/consultapi.css"

const ConsultAnimalsApi = ({filterSpecie }) => {
  const [page, setPage] = useState(1); // Estado para la página actual
  const { data, loading, error, totalpages, checkRole } = useFetchData('animal/animals-list/', page); //Array con Datos de los Animales Rescatados 

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  //Loop para verificar el Rol del Usuario y decidir si se visualizan en las tarjetas de animales los botones de Eliminar y Actualizar 
  let showButtons = false ;
  checkRole == "role_administratorf" ?  showButtons = true : showButtons = false ;
  //console.log(showButtons);

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
       {data
        .filter((item) => !filterSpecie || item.species === filterSpecie) // Filtra según el género
        .map((item) => (
          <ListCards
            key={item.id}
            imagen={item.image_url}
            name={item.name}
            habits={item.habits}
            species={item.species}
            age={parseInt(item.age)}
            gender={item.gender}
            showButtons={showButtons} // Pasa showButtons a cada tarjeta
           
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
