import { useState } from "react";

// Define the type for form data
type FormData = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

// Define the type for errors
type Errors = {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
};

// Custom hook for managing form state and validation
function useForms(initialState: FormData, validationRules: Record<keyof FormData, (value: string) => string | undefined>) {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<Errors>({});

  // Handle change in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate field on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validationRules[name as keyof FormData]?.(value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Check if the form is valid
  const isValid = () => {
    let valid = true;
    const newErrors: Errors = {};
    Object.keys(validationRules).forEach((field) => {
      const error = validationRules[field as keyof FormData]?.(formData[field as keyof FormData]) || undefined;
      if (error) valid = false;
      newErrors[field as keyof FormData] = error;
    });
    setErrors(newErrors);
    return valid;
  };

  return {
    formData,
    errors,
    handleChange,
    handleBlur,
    isValid,
  };
}

export default useForms;
