//import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import "../../assets/css/consultapi.css"

const ListCards = ({ imagen, name, habits, age, gender, }) => {

  const [show, setShow] = useState(false);

  const años = age < 2 ? "año" :  "años" ;

  //Ajustar la Primera Letra de cada "Prop" a mayuscula antes de Renderizarla
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };
  
  const capitalizeEachWord = (text) => {
    const words = text.split(" ");
    const wordsCapitalized = words.map(word => capitalize(word));
    return wordsCapitalized.join(" ");
  };

  return (
    <>
      <div className="card text-center" style={{ width: "18rem" }}>
        <div className="overflow2">
        <img src={imagen} id="adjustimage" className="card-imagen-top" alt={name} title={capitalizeEachWord(name)} />
        </div>
        <div className="card-body">
          <br/>
          <h5 className="card-title">Nombre: {capitalizeEachWord(name)}</h5>
          <h5 className="card-title">Edad: {age} {capitalizeEachWord(años)}</h5>
          <h5 className="card-title">Genero: {capitalizeEachWord(gender)}</h5>
          
          <div className="grid">
            <button
              className="details btn btn-info"
              type="button"
              onClick={() => {
                setShow(!show);
              }}
            >
              Details {show ? "-" : "+"}
            </button>
            <hr></hr>

            {show ? (
              <div style={{ color: "black" }}>{habits}</div>
            ) : (
              <div style={{ color: "blue" }}>
                <p>               
                </p>
              </div>
            )}
          </div>
         
        </div>
      </div>
    </>
  );
};

ListCards.propTypes = {
 
  imagen: PropTypes.string,
  habits: PropTypes.array,
  name:PropTypes.string,
  age:PropTypes.number,
  gender:PropTypes.string,
    
};


export default ListCards;
