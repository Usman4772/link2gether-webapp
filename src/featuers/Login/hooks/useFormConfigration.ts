import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

function useFormConfigration() {
  const formSchema = z.object({
    email: z.string().nonempty("Please enter your email"),
    password: z.string().nonempty("Please enter your password"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { setError } = form;
  return {
    form,
    formSchema,
    setError,
  };
}

export default useFormConfigration;
