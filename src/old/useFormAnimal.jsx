import { useState } from "react";

const useFormAnimal = (initialState = {}) => {
  const [form, setForm] = useState(initialState);

  const changed = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return { form, changed, setForm };
};

export default useFormAnimal;