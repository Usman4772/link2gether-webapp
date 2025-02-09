import { communitySchema } from "@/utils/backend/validation-schema/community.schema";
import { postSchema } from "@/utils/backend/validation-schema/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function useCreatePostConfig() {
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      description: "",
      media: null,
      
    },
  });

  const { setError } = form;

  return {
    form,
    setError,
  };
}

export default useCreatePostConfig;
