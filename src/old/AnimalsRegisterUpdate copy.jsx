import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useFormAnimal } from "../hooks/useFormAnimal";
import { Global } from '../helpers/Global';
import useFetchDataId from "../hooks/useFetchDataId";
import Swal from 'sweetalert2';
import imagen_top from "../../assets/images/page-img-4.jpg";
import useAuth from "../hooks/useAuth";

export const AnimalsRegisterUpdate = ({ cardId }) => {
  const { dataId, message, error } = useFetchDataId('animal/rescued-animal/', cardId);
  const { auth } = useAuth();
  console.log("Texto del Mensaje  " + message);
  console.log("Texto del dataId " + dataId);


  // Estado inicial del formulario
  const initialFormState = {
    name: '',
    owner_name: '',
    species: '',
    gender: '',
    image_url: null,
    age: '',
    diet: '',
    habits: '',
    diseases: '',
    trained: false,
    adopted: false,
  };

  // Estado del formulario y función para actualizar
  const { form, changed, setForm } = useFormAnimal(initialFormState);

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
        image_url: dataId.image_url || null,
        age: dataId.age || '',
        diet: dataId.diet || '',
        habits: dataId.habits || '',
        diseases: dataId.diseases || '',
        trained: dataId.trained || false,
        adopted: dataId.adopted || false,
      });
    }
  }, [dataId, setForm]);

  // Método para guardar un Animal Rescatado en la BD
  const saveAnimal = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Datos del formulario
    let newAnimal = form;
    newAnimal.user = auth._id;

    const request = await fetch(Global.url + 'animal/register', {
      method: 'POST',
      body: JSON.stringify(newAnimal),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await request.json();

    if (request.status === 201 && data.status === "created") {
      Swal.fire({
        title: data.message,
        icon: 'success',
        confirmButtonText: 'Continuar',
      });

      // Subir imagen si existe
      const fileInput = fileInputRef.current;
      if (fileInput && fileInput.files[0]) {
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
        if (uploadData.status !== "success") {
          Swal.fire({
            title: "¡Error al subir la imagen!",
            icon: 'error',
            confirmButtonText: 'Intenta nuevamente',
          });
        }
      }

    } else {
      Swal.fire({
        title: data.message || "¡Error en el registro!",
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

      <div className="content__posts">
        <div className="form-style">
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
                <img src={imagen_top} alt="" className="imagen_top" />
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
          </form>
        </div>
      </div>
    </>
  );
};

AnimalsRegisterUpdate.propTypes = {
  cardId: PropTypes.string.isRequired
};
