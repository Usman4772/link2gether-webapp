import { CustomTextArea } from "@/components/Global/CustomFormFields";
import FormInput from "@/components/Global/FormInput";
import Uploader from "@/components/Global/Uploader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SparklesText } from "@/components/ui/sparkles-text";
import { Loader2 } from "lucide-react";
import useCreateCommunity from "../hooks/useCreateCommunity";
import useEditFormConfig from "../hooks/useEditFormConfig";
import useUpdateCommunity from "../hooks/useUpdateCommunity";

function EditForm({
    initialData,
    setOpenModal,
  id,
}: {
        initialData: any;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | number;
}) {
  const { form, setError } = useEditFormConfig(initialData);

  const { updateCommunity, isPending, error } = useUpdateCommunity({
    setError,
    form,
      id: id,
    setOpenModal,
  });
    
    
    function handleOnFinish(data:{community_name:string,description:string}){ 
        const formData = new FormData();
        formData.append("community_name", data.community_name);
        formData.append("description", data.description);
        updateCommunity(formData);
    }
        

  return (
    <div className="w-full overflow-x-hidden min-h-screen flex  items-center justify-center flex-col lg:flex-row md:justify-between  bg-white md:rounded-[1rem] shadow-sm lg:w-full lg:h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => handleOnFinish(data))}
          className="flex w-full flex-col md:items-start   md:justify-start justify-center items-center h-full pt-9 pb-4 "
        >
          <div className="w-full items-center justify-center  pb-12">
            <SparklesText
              text={"Link To Gether"}
              className="text-[25px]  text-center"
            />
          </div>
          <FormField
            name="community_name"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-[12px] mx-0 lg:mx-[16px] w-full flex items-start justify-center flex-col">
                <FormControl>
                  <FormInput
                    placeholder="Enter Community Name"
                    {...field}
                    parentStyles="flex items-center justify-center lg:justify-start"
                    className="w-[95%] "
                    name="community_name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-[12px] mx-0  w-full flex items-start justify-center flex-col ">
                <FormControl>
                  <CustomTextArea
                    className="w-[95%]  mx-0 lg:mx-[16px]  h-[211px] max-h-[211px]  justify-center flex lg:justify-start"
                    {...field}
                    placeholder="Add community description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant={"blue"}
            className="w-[95%] h-[56px]  mx-[16px] py-[12px] hover:bg-blue-500"
          >
            {isPending && <Loader2 className="animate-spin" />}
            Update Community
          </Button>
        </form>
      </Form>
    </div>
  );
}
export default EditForm;
