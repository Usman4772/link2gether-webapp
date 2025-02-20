import { communitySchema } from "@/utils/backend/validation-schema/community.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function useCreateFormConfig() {
  const form = useForm({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      community_name: "",
      category: "",
      description: "",
      visibility:"public",
      avatar: null,
    },
  });

  const { setError } = form;

  return {
    form,
    setError,
  };
}

export default useCreateFormConfig;
