import toast from "react-hot-toast";

export function transformErrors(errors:any) {
  const transformedErrors = Object.entries(errors).map(([key, value]) => ({
    name: key.split("."),
    errors: value,
  }));
  return transformedErrors;
}

export async function displayErrors(errors:any[]) {
  const transformedErrors = transformErrors(errors);
  transformedErrors.forEach(({ name, errors }:{name:any,errors:any}) => {
    errors.forEach((errMsg:string) => {
      toast.error(errMsg); // Display error message for each field
    });
  });
}
export function handleAPIErrors(error:any, customMessage = "Something went wrong") {
  const errors = error?.response?.data?.data?.errors;
  const errorMessage = error?.response?.data?.message;
  if (errors) {
    displayErrors(errors);
  } else if (errorMessage) {
    toast.error(errorMessage);
  } else {
    toast.error(customMessage);
  }
}

export function transformFormErrors(errors:any, setError:any) {
  errors.forEach((err:any) => {
    const [field, message] = Object.entries(err)[0];
    setError(field, {
      type: "server",
      message: message,
    });
  });
}

export function handleFormErrors(error:any, setError:any) {
  const errors = error?.response?.data?.errors;
  if (errors) {
    transformFormErrors(error?.response?.data?.errors, setError);
  }
  toast.error(error?.response?.data?.message);
}
