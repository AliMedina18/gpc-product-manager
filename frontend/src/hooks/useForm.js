import { useState, useCallback } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(
    (onSubmit) => {
      return async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          await onSubmit(values);
        } catch (error) {
          if (error.error) {
            setErrors({ submit: error.error });
          } else {
            setErrors({ submit: "Error al procesar la solicitud" });
          }
          throw error;
        } finally {
          setLoading(false);
        }
      };
    },
    [values],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    loading,
    setValues,
    setErrors,
    handleChange,
    handleSubmit,
    reset,
  };
};
