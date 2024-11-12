import PropTypes from "prop-types";
import { useState , useEffect, useRef } from "react";
import { useForm }  from "../hooks/useForm";
import { Global } from '../helpers/Global';
import useFetchDataId from "../hooks/useFetchDataId";
import Swal from 'sweetalert2';
import imagen_top from "../../assets/images/page-img-4.jpg"
import useAuth from "../hooks/useAuth";


export const AnimalsRegisterUpdate = (cardId) => {

  //const valuedId = cardId;
  //console.log("hola:      " + valuedId.cardId );    //////////////
  
  const { dataId, message, error } = useFetchDataId('animal/rescued-animal/', valuedId.cardId );
  console.log(" dato del registro traido por fetch API" + dataId._Id);
  
  //Estado inicial del formulario

  let initialFormState = {
    name: '',
    owner_name: '',
    species: ' ',
    gender: ' ',
    image_url: null,
    age:' ',
    diet:' ',
    habits: '',
    diseases:' ',
    trained: false, 
    adopted: false,
       
     };
     
    
 
   // Ref para el campo de archivo
   const fileInputRef = useRef(null);
  
   const { auth } = useAuth();
  
  // Usar el hook personalizado useFormAnimal para cargar los datos del formulario
  const { form, changed , resetForm} = useForm(initialFormState);

  // Estado para mostrar el resultado del registro del animal rescatado en la BD
  const [ saved, setSaved ] = useState("not sended");

  const [stored, setStored] = useState("not_stored");

  // useEffect para ocultar el mensaje de éxito después de 1 segundo
  useEffect(() => {
    if (stored === "stored") {
      const timer = setTimeout(() => {
      setStored("not_stored"); // Aquí se cambia el estado a "not_stored" para ocultar el mensaje
      }, 1000);

      // Limpiar el temporizador si el componente se desmonta antes de que se complete
      return () => clearTimeout(timer);
    }
  }, [stored]); // Este efecto solo se ejecuta cuando "stored" cambia

  // Método Guardar un Animal Rescatado usuario en la BD
  const saveAnimal = async (e) => {

    // Prevenir que se actualice la pantalla
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Obtener los datos del formulario
    let newAnimal = form;
    newAnimal.user = auth._id;  

    // Petición a la API (Backend) para guardar el registro del animal rescatado en la BD
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
       //Mostrar el modal de éxito
        Swal.fire({
        title: data.message,
        icon: 'success',
        confirmButtonText: 'Continuar',
        });
                
        // Subir imagen del Animal Registrado
        const fileInput = document.querySelector("#image_url");
       
        if(data.status == "created" && fileInput.files[0]){
            const formData = new FormData();
            formData.append("file0", fileInput.files[0]);

            const uploadRequest = await fetch(Global.url + "animal/upload-media-animals/" + data.extractedId, {
            method: "POST",
            body: formData,
            headers: {
           "Authorization": token
           }
        });

          const uploadData = await uploadRequest.json();

          if(uploadData.status !== "success"){
           setStored("error");
          // Mostrar el modal de error
          Swal.fire({
          title: data.message || "¡Error al subir la imagen !",
          icon: 'error',
          confirmButtonText: 'Intenta subir la imagen nuevamente actualizando el registro del animal rescatado ',
          });

          }
          
        }

        //Reseteo de los datos del Formulario
        resetForm(initialFormState);
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Limpiar el campo file
        }

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
        <h1 className="content__title">Actualizar Registro</h1>
      </header>

      {/* Formulario de Registro*/}
      <div className="content__posts">
        <div className="form-style">

          {/* Respuesta de animal rescatado registrado */}
          {saved == "saved" ? (
            <strong className="alert alert-success">¡Registro de Animal Rescatado  actualizado correctamente!</strong>
          ) : ''}
          {saved == "error" ? (
            <strong className="alert alert-danger">¡Error, Registro de Animal Rescatado  no se ha actualizado !</strong>
          ) : ''}


          <form className="form_animales" id="animal-form" autoComplete="off" onSubmit={saveAnimal}>
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
               
              <div className="sectiontwo_form">
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
              </div> 
              <div  className="sectiontwo_form">
                <div className="form-group">
                  <label htmlFor="image_url">Subir imagen</label>
                  <input
                  type="file"
                  ref={fileInputRef}
                  id="image_url"
                  name="file0"
                  />
                </div>
                
                <div className="submitbtn">
                    <input
                    type="submit"
                    value="Actualizar"
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

AnimalsRegisterUpdate.propTypes = {

 cardId: PropTypes.string.isRequired

}


