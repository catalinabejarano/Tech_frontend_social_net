//import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import "../../assets/css/consultapi.css"

const ListCards = ({ imagen, name, habits, age, gender }) => {

  const [show, setShow] = useState(false);

  return (
    <>
      <div className="card text-center " style={{ width: "18rem" }}>
        <div className="overflow2">
        <img src={imagen} id="adjustimage" className="card-imagen-top" alt={name} title={name} />
        </div>
        <div className="card-body">
          <h5 className="card-title">Nombre:{name}</h5>
          <h5 className="card-title">Edad:{age}  año</h5>
          <h5 className="card-title">Genero:{gender}</h5>
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
                 {/*<a
                    href={ruta ? ruta : "#!"}
                    target="_blank"
                    className="btn btn-primary"
                    rel="noreferrer"
                  >
                    Ir a MARVEL
                    
                    </a>*/}
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
  NavigationPreloadManager: PropTypes.string.isRequired,
  imagen: PropTypes.string,
  habits: PropTypes.string,
  name:PropTypes.string,
  age:PropTypes.number,
  gender:PropTypes.string
};


export default ListCards;
