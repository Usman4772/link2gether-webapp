import {
  CustomSelectBox,
  CustomTextArea,
} from "@/components/Global/CustomFormFields";
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
import { forwardRef, useImperativeHandle } from "react";
import useCreateCommunity from "../hooks/useCreateCommunity";
import useCreateFormConfig from "../hooks/useCreateFormConfig";
import { CategoriesSelectBox } from "./CategoriesSelectBox";
import CustomButton from "@/components/Global/CustomButton";

interface CreateFormProps {
  props?: any;
}

const CreateForm = forwardRef<any, CreateFormProps>(function CreateForm(
  { props },
  ref
) {
  const { form, setError } = useCreateFormConfig();

  const { fileList, setFileList, btnLoading, createCommunity } =
    useCreateCommunity({ setError, form });

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
          onSubmit={form.handleSubmit(createCommunity)}
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

          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-[12px] mx-0 lg:mx-[16px] w-full flex items-start justify-center flex-col">
                <FormControl>
                  <CategoriesSelectBox {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="visibility"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-[12px] mx-0 lg:mx-[16px] w-full flex items-start justify-center flex-col ">
                <FormControl>
                  <CustomSelectBox
                    className="w-[448px]"
                    placeholder="Select Visibility"
                    label="Visibility"
                    items={[
                      { label: "Public", value: "public" },
                      { label: "Private", value: "private" },
                    ]}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CustomButton
            variant={"secondary"}
            type="submit"
            loading={btnLoading}
            size={"xl"}
            text="Create"
          />
        </form>
      </Form>
    </div>
  );
});

export default CreateForm;
