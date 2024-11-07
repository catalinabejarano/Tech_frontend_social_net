import { useEffect, useState } from "react";
import axios from "axios";
import ListCards from "../components/animals/ListCards";
import "../../assets/css/consultapi.css"


const ConsultAnimalsApi = () => {

  const [datos, setDatos] = useState([]);

  //const categoria = "events";
  const url = "http://localhost:3900/api/animal/animals-list/3";

  useEffect(() => {
    const solicitud = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        setDatos(response.data.animals);
       
        
      } catch (error) {
        console.log("Error detectado en la consulta de la API de Animales:", error);
      }
    };
    solicitud();
  }, );

  return (
    <>
      <main className="container">  
        
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
