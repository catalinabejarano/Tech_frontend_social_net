import { useState} from "react";

export const useFormAnimal = (initialObj = {}) => {
  const [form, setForm] = useState(initialObj);

  const changed = ({ target }) => {
    const { name, value, type, checked } = target;

    setForm(prevForm => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleArrayChange = (name, index, value) => {
    setForm(prevForm => {
      const updatedArray = [...prevForm[name]];
      updatedArray[index] = value;
      return { ...prevForm, [name]: updatedArray };
    });
  };

  const resetForm = () => {
    setForm(initialObj);
  };

  return {
    form,
    changed,
    resetForm,
    setForm,
    handleArrayChange // Retorna la función para manejar arrays
  };
};