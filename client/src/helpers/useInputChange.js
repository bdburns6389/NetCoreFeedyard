import { useState } from "react";

// Custom hook for handling input changes in forms.
export const useInputChange = () => {
  const [input, setInput] = useState({});

  const handleInputChange = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  return [input, handleInputChange];
};
