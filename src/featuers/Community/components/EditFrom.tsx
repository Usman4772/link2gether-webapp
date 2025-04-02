import { Divider, Form } from "antd";
import useEditFormConfig from "../hooks/useEditFormConfig";
import useUpdateCommunity from "../hooks/useUpdateCommunity";
import { motion } from "framer-motion";
import Paragraph from "@/components/Global/Paragraph";
import {
  CustomInput,
  CustomTextArea,
} from "@/components/Global/AntDesignFormFields";
import ModalFooter from "@/components/Global/ModalFooter";
import Heading from "@/components/Global/Heading";

function EditForm({
  initialData,
  setOpenModal,
  id,
}: {
  initialData: any;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | number;
}) {
  const [form] = Form.useForm();

  const { updateCommunity, isPending, error } = useUpdateCommunity({
    form,
    id: id,
    setOpenModal,
  });

  function handleOnFinish(data: {
    community_name: string;
    description: string;
  }) {
    const formData = new FormData();
    formData.append("community_name", data.community_name);
    formData.append("description", data.description);
    updateCommunity(formData);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-2 w-full "
    >
      <div className="text-start mb-6 flex flex-col items-start gap-2">
        <Heading text="Update Community" size="23px" />
        <Paragraph text="Update your community" />
        <Divider className="my-4 border-neutral-200 dark:border-neutral-700" />
      </div>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleOnFinish}
        initialValues={{
          community_name: initialData?.community_name,
          description: initialData?.description,
        }}
        className=""
      >
        <div className="space-y-4">
          <Form.Item
            name={"community_name"}
            label={
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                Community Name
              </span>
            }
          >
            <CustomInput placeholder="Enter community name..." />
          </Form.Item>
          <Form.Item
            name={"description"}
            label={
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                Description
              </span>
            }
         
          >
            <CustomTextArea placeholder="Add description..." />
          </Form.Item>
        </div>

        <div className="mt-6">
          <ModalFooter
            setOpenModal={() => setOpenModal(false)}
            okText="Update Community"
            okBtnLoading={isPending}
          />
        </div>
      </Form>
    </motion.div>
  );
}
export default EditForm;
