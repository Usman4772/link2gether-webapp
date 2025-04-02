import toast from "react-hot-toast";

export function transformErrors(errors: any) {
  const transformedErrors: any = [];
  errors.forEach((err: any) => {
    Object.entries(err).forEach(([key, value]) => {
      transformedErrors.push({
        name: key,
        value: value,
      });
    });
  });
  return transformedErrors;
}

export async function displayErrors(errors: any[]) {
  const transformedErrors = transformErrors(errors);
  transformedErrors.forEach(({ name, value }: { name: any; value: any }) => {
    toast.error(value);
  });
}
export function handleAPIErrors(
  error: any,
  customMessage = "Something went wrong"
) {
  const errors = error?.response?.data?.errors;
  const errorMessage = error?.response?.data?.message;
  if (errors && errors.length > 0) {
    displayErrors(errors);
  } else if (errorMessage) {
    toast.error(errorMessage);
  } else {
    toast.error(customMessage);
  }
}

export function transformShadCnFormErrors(errors: any, setError: any) {
  errors.forEach((err: any) => {
    const [field, message] = Object.entries(err)[0];
    setError(field, {
      type: "server",
      message: message,
    });
  });
}

export function handleFormErrors(error: any, setError: any) {
  const errors = error?.response?.data?.errors;
  if (errors) {
    transformShadCnFormErrors(error?.response?.data?.errors, setError);
  } else {
    toast.error(error?.response?.data?.message);
  }
}

export function handleAntDFormErrors(error: any, form: any) {
  if (!form || !error) return null;
  const errorMessage = error?.response?.data?.message;
  const errors = error?.response?.data?.errors;

  if (errors) {
    const transformedErrors = transformErrors(error?.response?.data?.errors);
    form.setFields(transformedErrors);
  } 
  toast.error(errorMessage || "Something went wrong. Please try again");
}
