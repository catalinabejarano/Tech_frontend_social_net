import { useState } from "react";
import  useFormAnimal  from "../hooks/useFormAnimal";
import { useNavigate } from "react-router-dom";
import { Global } from '../helpers/Global';
import Swal from 'sweetalert2';
import imagen_top from "../../assets/images/page-img-4.jpg"

export const AnimalsRegister = () => {

  // Variable para almacenar el token para las peticiones a realizar en este componente
  const token = localStorage.getItem("token");

  //Estado inicial del formulario
  const initialFormState = {
    name: ' ',
    owner_name: ' ',
    species: ' ',
    gender: ' ',
    image_url: ' ',
    age:' ',
    diet:' ',
    habits: ' ',
    diseases:' ',
    trained: false, 
    adopted: false,
  };
  
  

  // Usar el hook personalizado useFormAnimal para cargar los datos del formulario
  const { form, changed, setForm } = useFormAnimal(initialFormState);

  // Estado para mostrar el resultado del registro del animal rescatado en la BD
  const [ saved, setSaved ] = useState("not sended");

  // Hook para redirigir
  const navigate = useNavigate();

  // Método Guardar un Animal Rescatado usuario en la BD
  const saveAnimal = async (e) => {

    // Prevenir que se actualice la pantalla
    e.preventDefault();

    // Obtener los datos del formulario
    let newAnimal = form;

    // Petición a la API (Backend) para guardar el usuario en la BD
    const request = await fetch(Global.url + 'animal/register', {
      method: 'POST',
      body: JSON.stringify(newAnimal),
      headers: {
       "Content-Type": "application/json",
       "Authorization": token
      }
    });

    // Obtener la información retornada por el backend
    const data = await request.json();

    // Verificar si el estado de la respuesta es "created" seteamos la variable de estado saved con "saved"
    if(request.status === 201 && data.status === "created"){
      setSaved("saved");

      // Mostrar el modal de éxito
      Swal.fire({
        title: data.message,
        icon: 'success',
        confirmButtonText: 'Continuar',
      }).then(() => {
        // Redirigir después de cerrar el modal
        setForm(initialFormState);
        navigate('/rsocial/rescatados');
        
      });

    } else {
      setSaved("error");

      // Mostrar el modal de error
      Swal.fire({
        title: data.message || "¡Error en el registro!",
        icon: 'error',
        confirmButtonText: 'Intentar nuevamente',
      });
    };
  };

  

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Registro Animales Rescatados</h1>
      </header>

      {/* Formulario de Registro*/}
      <div className="content__posts">
        <div className="form-style">

          {/* Respuesta de animal rescatado registrado */}
          {saved == "saved" ? (
            <strong className="alert alert-success">¡Animal Rescatado  registrado correctamente!</strong>
          ) : ''}
          {saved == "error" ? (
            <strong className="alert alert-danger">¡El Animal Rescatado no se ha registrado correctamente!</strong>
          ) : ''}


          <form className="form_animales" onSubmit={saveAnimal}>
           <div className="sectionone_form">  
            <div className="inputs_form">
              <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                onChange={changed}
                value={form.name || ''}
                autoComplete="given-name"
              />
              </div>
              <div className="form-group">
              <label htmlFor="owner_name">Ubicación</label>
              <select
                type="text"
                id="owner_name"
                name="owner_name"
                required
                onChange={changed}
                value={form.owner_name|| ''}
                autoComplete="ubicación-actual"
               >
               <option value="">Seleccione una opción</option>
               <option value="fundacion">Fundación</option>
               <option value="particular">Particular</option>
              
              </select>  
              
              </div>
              <div className="form-group">
              <label htmlFor="species">Especie</label>
              <select
                type="text"
                id="species"
                name="species"
                required
                onChange={changed}
                value={form.species || ''}
                autoComplete="especie"
              >
                <option value="">Seleccione una opción</option>
                <option value="gato">Gato</option>
                <option value="perro">Perro</option>
              </select>  
              </div>
            </div>  
            <div className="inputs_form">
              <div>
              <img src={imagen_top} alt="" className="imagen_top" />  
              </div>
              <div className="form-group">
              <label htmlFor="gender">Genero</label>
              <select
                id="gender"
                name="gender"
                required
                onChange={changed}
                value={form.gender || ''}
                autoComplete="genero"
                >
                <option value="">Seleccione una opción</option>
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
              </select>
              </div>
              <div className="form-group">
              <label htmlFor="age">Edad</label>
              <select
                type="number"
                id="age"
                name="age"
                onChange={changed}
                value={form.age || ''}
                autoComplete="edad-animal"
              > 
              <option value="">Seleccione una opción</option>
              <option value="1">1 año</option>
              <option value="2">2 años</option>
              <option value="3">3 años</option>
              <option value="4">4 años</option>
              <option value="5">5 años</option>
              <option value="6">6 años</option>
              <option value="7">7 años</option>
              <option value="8">8 años</option>
              <option value="9">9 años</option>
              <option value="10">10 años</option>
              <option value="11">11 años</option>
              <option value="12">12 años</option>
              <option value="13">13 años</option>
              <option value="14">14 años</option>
              <option value="15">15 años</option>

              </select>  
              </div>
            </div>   
            </div>

            <div  className="sectiontwo_form">
                <div className="form-group">
                  <label htmlFor="image_url">Imagen URL</label>
                  <input
                   type="text"
                  id="image_url"
                  name="image_url"
                  onChange={changed}
                  value={form.image_url || ''}
                  autoComplete="imagen-url"
                   />
                </div>
                <div>
                  <label htmlFor="trained">Doméstico</label>
                  <input
                  type="checkbox"
                  id="trained"
                  name="trained"
                  onChange={changed}
                  checked={form.trained || ''}
                  autoComplete="domesticado"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="adopted">Adopción</label>
                  <input
                  type="checkbox"
                  id="adopted"
                  name="adopted"
                  onChange={changed}
                  checked={form.adopted|| ''}
                  autoComplete="adopción-animal"
                  />
                </div>
                <div className="submitbtn">
                    <input
                    type="submit"
                    value="Regístrar"
                    className="btn btn-success"
                    />
                </div> 
                
          </div>
            <div className="form-group">
              <label htmlFor="diet">Dieta Alimentaria</label>
              <textarea
                id="diet"
                name="diet"
                maxLength="60"
                onChange={changed}
                value={form.diet || ''}
                autoComplete="dieta-nutricional"
              />
            </div>
            <div className="form-group">
              <label htmlFor="habits">Habitos</label>
              <textarea
                id="habits"
                name="habits"
                maxLength="60"
                onChange={changed}
                value={form.habits || ''}
                autoComplete="habitos-animal"
              />
            </div>  
            <div className="form-group">
              <label htmlFor="diseases">Enfermedades</label>
              <textarea
                id="diseases"
                name="diseases"
                maxLength="60"
                onChange={changed}
                value={form.diseases|| ''}
                autoComplete="enfermedades-animal"
              />
             </div>  
          </form>
        </div>
      </div>
    </>
  )
}
