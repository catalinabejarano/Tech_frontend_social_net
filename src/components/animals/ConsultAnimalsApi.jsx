import { useEffect, useState } from "react";
import axios from "axios";
import ListCards from "./ListCards";
import "../../assets/css/consultapi.css"


const ConsultAnimalsApi = () => {
  const [datos, setDatos] = useState([]);

  //const categoria = "events";
  const url = "http://localhost:3900/api/animal/animals-list/";

  useEffect(() => {
    const solicitud = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        setDatos(response.data.animals);
       
        
      } catch (error) {
        console.log("Error detectado API:", error);
      }
    };
    solicitud();
  }, );

  return (
    <>
      <main className="container">  
        {/* <Tarjetas
      ruta="https://cdn.marvel.com/u/prod/marvel/i/mg/8/60/6553cca0c0c41/detail.jpg"
      titulo="Card title"
      descripcion="Soy una descripcion"
    /> */}
        {datos.map((item) => (
          <ListCards
            key={item.id}
            imagen={item.image_url}
            name={item.name}
            habits={item.habits}
            age={item.age}
            gender={item.gender}
          />
        ))}
      </main>
    </>
  );
};
export default ConsultAnimalsApi;
