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
import React, { forwardRef, useImperativeHandle } from "react";
import useCreatePostConfig from "../hooks/useCreatePostConfig";
import useCreateCommunity from "../hooks/useCreateCommunity";
import useCreatePost from "../hooks/useCreatePost";


interface CreatePostFormProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    id:string | number;
}

const CreatePostForm = forwardRef<any, CreatePostFormProps>(function CreatePostForm(
  { setOpenModal,id },
  ref
) {
    console.log('id',id)
  const { form, setError } = useCreatePostConfig();

  const { fileList, setFileList, btnLoading, createPost } =
    useCreatePost({ setError, form ,id,setOpenModal});

  function resetForm() {
    form.reset();
    setFileList([]);
  }

  useImperativeHandle(ref, () => ({
    resetForm,
  }));

  return (
    <div className="w-full overflow-x-hidden min-h-screen flex  items-center justify-center flex-col lg:flex-row md:justify-between  bg-white md:rounded-[1rem] shadow-sm lg:w-full lg:h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createPost)}
          className="flex w-full flex-col md:items-start   md:justify-start justify-center items-center h-full pt-9 pb-4 "
        >
          <div className="w-full items-center justify-center  pb-12">
            <SparklesText
              text={"Link To Gether"}
              className="text-[25px]  text-center"
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <Uploader
              fileList={fileList}
              setFileList={setFileList}
              placeholder={"Avatar"}
            />
          </div>

       
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-[12px] mx-0  w-full flex items-start justify-center flex-col ">
                <FormControl>
                  <CustomTextArea
                    className="w-[95%]  mx-0 lg:mx-[16px]  h-[211px] max-h-[211px]  justify-center flex lg:justify-start"
                    {...field}
                    placeholder="Add post description"
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
            {btnLoading && <Loader2 className="animate-spin" />}
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
});

export default CreatePostForm;
