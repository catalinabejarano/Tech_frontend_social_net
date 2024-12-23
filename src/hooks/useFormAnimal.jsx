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

  const resetForm = () => {
    setForm(initialObj);
  };

  return {
    form,
    changed,
    resetForm,
    setForm,
  };
};