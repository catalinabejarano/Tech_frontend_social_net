import PropTypes from "prop-types";
import { useState, useEffect, useRef, useContext } from "react";
import { useFormAnimal } from "../../hooks/useFormAnimal";
import { Global } from '../../helpers/Global';
import { RenderContext } from "../../context/RenderContext";
import { SerializeForm } from "../../helpers/SerializeForm";
import useFetchDataId from "../../hooks/useFetchDataId";
import Swal from 'sweetalert2';
import avatar from "../../assets/images/default_animal.jpg"

export const AnimalsRegisterUpdate = ({ cardId }) => {

  const { updateRegisterAnimal } = useContext(RenderContext);

  const { dataId, message} = useFetchDataId('animal/rescued-animal/', cardId);
  
  // Estado inicial del formulario
  const initialFormState = {
    name: '',
    owner_name: '',
    species: '',
    gender: '',
    image_url: avatar,
    age: '',
    diet: [],
    habits: [],
    diseases: [],
    trained: false,
    adopted: false,
  };

  // Estado del formulario y función para actualizar
  const { form, changed, setForm, handleArrayChange, resetForm } = useFormAnimal(initialFormState);

  // Ref para el campo de archivo
  const fileInputRef = useRef(null);

  // Actualizar initialFormState cuando dataId esté disponible
  useEffect(() => {
    if (dataId) {
      setForm({
        name: dataId.name || '',
        owner_name: dataId.owner_name || '',
        species: dataId.species || '',
        gender: dataId.gender || '',
        image_url: dataId.image_url  || avatar,
        age: dataId.age || '',
        diet: dataId.diet || '', // Carga array
        habits: dataId.habits || [], // Carga array
        diseases: dataId.diseases || [], // Carga array
        trained: dataId.trained || false,
        adopted: dataId.adopted || false,
      });
    }
  }, [dataId, setForm]);

   // Estado para mostrar el resultado de la actualización del  registro del animal rescatado en la BD
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


    // Método para actualizar un Animal Rescatado en la BD
    const saveAnimal = async (e) => {

     // Prevenir que se actualice la pantalla
    e.preventDefault();
    const token = localStorage.getItem("token");
    

    // Actualizar imagen del Animal Registrado
      const fileInput = document.querySelector("#image_url");
       
      if(fileInput.files[0]){
          const formData = new FormData();
          formData.append("file0", fileInput.files[0]);
        const uploadRequest = await fetch(Global.url + "animal/upload-media-animals/" + cardId, {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": token
          }
        });

        const uploadData = await uploadRequest.json();
       
        if (uploadData.status !== "success") {
          setStored("error");
          // Mostrar el modal de error
          Swal.fire({
            title: uploadData.message || "¡Error al subir la imagen !",
            icon: 'error',
            confirmButtonText: 'Intenta actualizar nuevamente',
            });
        }
      }

      // Obtener los datos del formulario
      let newDataAnimal = SerializeForm(e.target);

      // Borrar file0 porque no lo vamos a actualizar por acá
      delete newDataAnimal.file0;

     // Petición a la API (Backend) para actualizar el registro del animal rescatado en la BD
      const request = await fetch(Global.url + 'animal/update-register/' + cardId, {
      method: 'PUT',
      body: JSON.stringify(newDataAnimal),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await request.json();

    // Verificar si el estado de la respuesta es "success" seteamos la variable de estado saved con "success"
    if (request.status === 200 && data.status === "success") {
      setSaved("success");
      Swal.fire({
        title: data.message,
        icon: 'success',
        confirmButtonText: 'Continuar',
      });
      

       //Reseteo de los datos del Formulario
       resetForm(initialFormState);
       if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Limpiar el campo file
       }

    } else {
      setSaved("error");

      //Se reinicia la variable de la Card actualizada
      updateRegisterAnimal("");


        // Mostrar el modal de error
      Swal.fire({
        title: data.message || "¡Error en la actualizacion del registro!",
        icon: 'error',
        confirmButtonText: 'Intentar nuevamente',
      });
    }
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
          {saved == "success" ? (
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
                    
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="owner_name">Ubicación</label>
                  <select
                    id="owner_name"
                    name="owner_name"
                    required
                    onChange={changed}
                    value={form.owner_name || ''}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="fundacion">Fundación</option>
                    <option value="particular">Particular</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="species">Especie</label>
                  <select
                    id="species"
                    name="species"
                    required
                    onChange={changed}
                    value={form.species || ''}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="gato">Gato</option>
                    <option value="perro">Perro</option>
                  </select>
                </div>
              </div>
              <div className="inputs_form">
                <div>
                {/*<img src={imagen_top} alt="" className="imagen_top" />*/}
                <img src={form.image_url} alt="Animal Rescatado" style={{ width: '70px', height: '70px' }} />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Género</label>
                  <select
                    id="gender"
                    name="gender"
                    required
                    onChange={changed}
                    value={form.gender || ''}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="macho">Macho</option>
                    <option value="hembra">Hembra</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="age">Edad</label>
                  <select
                    id="age"
                    name="age"
                    onChange={changed}
                    value={form.age || ''}
                  >
                    <option value="">Seleccione una opción</option>
                    {[...Array(15).keys()].map(i => (
                      <option key={i + 1} value={i + 1}>{i + 1} año{ i + 1 > 1 ? 's' : '' }</option>
                    ))}
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
                  checked={form.trained || false}
                />
              </div>
              <div className="form-group">
                <label htmlFor="adopted">Adopción</label>
                <input
                  type="checkbox"
                  id="adopted"
                  name="adopted"
                  onChange={changed}
                  checked={form.adopted || false}
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
              <label htmlFor="habits">Hábitos</label>
               {form.habits.map((habit, index) => (
              <textarea
               key={index}
               type="textarea"
               value={habit || ''}
              onChange={(e) => handleArrayChange("habits", index, e.target.value)}
              />
              ))}
              </div>

              <div className="form-group">
              <label htmlFor="diseases">Enfermedades</label>
              {form.diseases.map((disease, index) => (
              <textarea
              key={index}
              type="textarea"
              value={disease || ''}
              onChange={(e) => handleArrayChange("diseases", index, e.target.value)}
              />
              ))}
            </div>
            {/*
            <div className="form-group">
              <label htmlFor="diet">Dieta</label>
              {form.diet.map((diet, index) => (
              <input
              key={index}
              type="text"
              value={diet || ''}
              onChange={(e) => handleArrayChange("diet", index, e.target.value)}
              />
              ))}
            </div>
            */}
             {/* 
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
              */} 
          </form>
        </div>
      </div>
    </>
  );
};

AnimalsRegisterUpdate.propTypes = {
  cardId: PropTypes.string.isRequired
};
