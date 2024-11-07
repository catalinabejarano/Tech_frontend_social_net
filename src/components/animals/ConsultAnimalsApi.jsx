import {  useState } from "react";
import useFetchData from '../../hooks/useFetchData'
import ListCards from "./ListCards";
import Loading from '../../assets/images/loading.webp'
import "../../assets/css/consultapi.css"

const ConsultAnimalsApi = () => {
  const [page, setPage] = useState(1); // Estado para la página actual
  const { data, loading, error, totalpages } = useFetchData('animal/animals-list/', page); //Array con Datos de los Animales Rescatados 

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));


  if (loading) return <img src= {Loading} />;
  if (error) return <p>Error: {error}</p>;
  console.log("paginas maximas " + totalpages);
  const total = parseInt(totalpages); 

  return (
    <>  
         <div className="navegacion">
            <button onClick={handlePrevPage} disabled={page === 1}>
             Atrás
            </button>
            <span>Página {page}</span>
            <button onClick={handleNextPage} disabled={page === total }>
            Adelante
            </button></div>
        
  
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


export default ConsultAnimalsApi;
