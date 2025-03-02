import { updateCommunitySchema } from "@/utils/backend/validation-schema/community.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function useEditFormConfig( initialData: any ) {
  const form = useForm({
    resolver: zodResolver(updateCommunitySchema),
    defaultValues: {
      community_name: initialData?.community_name,
      description: initialData?.description,
    },
  });

  const { setError } = form;

  return {
    form,
    setError,
  };
}

export default useEditFormConfig;
