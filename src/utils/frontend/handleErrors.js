import toast from "react-hot-toast";

export function transformErrors(errors) {
  const transformedErrors = Object.entries(errors).map(([key, value]) => ({
    name: key.split("."),
    errors: value,
  }));
  return transformedErrors;
}

export async function displayErrors(errors) {
  const transformedErrors = transformErrors(errors);
  transformedErrors.forEach(({ name, errors }) => {
    errors.forEach((errMsg) => {
      toast.error(errMsg); // Display error message for each field
    });
  });
}
export function handleAPIErrors(error, customMessage = "Something went wrong") {
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
