import { forwardRef, useImperativeHandle } from "react";
import useCreateCommunity from "../hooks/useCreateCommunity";
import { Form, Typography, Divider } from "antd";
import {
  CustomInput,
  CustomSelect,
  CustomTextArea,
} from "@/components/Global/AntDesignFormFields";
import Uploader from "@/components/Global/Uploader";
import CommunityTypes from "../utils/static";
import ModalFooter from "@/components/Global/ModalFooter";
import { setOpenCreateCommunityModal } from "@/redux/Slices/create.community.slice";
import { useAppDispatch } from "@/hooks/useAppSelector";
import { motion } from "framer-motion";
import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";

interface CreateFormProps {
  props?: any;
}

const CreateForm = forwardRef<any, CreateFormProps>(function CreateForm(
  { props },
  ref
) {
  const [form] = Form.useForm();
  const { fileList, setFileList, btnLoading, createCommunity } =
    useCreateCommunity({ form });
  const dispatch = useAppDispatch();

  function resetForm() {
    form.resetFields();
    setFileList([]);
  }

  useImperativeHandle(ref, () => ({
    resetForm,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-2 w-full "
    >
      <div className="text-start mb-6 flex flex-col items-start gap-2">
        <Heading text="Create Community" size="23px" />
        <Paragraph text="Join together, grow together. Connect with like-minded people." />

        <Divider className="my-4 border-neutral-200 dark:border-neutral-700" />
      </div>

      <Form
        layout="vertical"
        form={form}
        onFinish={createCommunity}
        className=""
      >
        <div className="w-full flex items-center justify-center mb-6">
          <Uploader
            fileList={fileList}
            setFileList={setFileList}
            placeholder={"Community Avatar"}
          />
        </div>

        <div className="space-y-4">
          <Form.Item
            name={"community_name"}
            label={
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                Community Name
              </span>
            }
            rules={[
              {
                required: true,
                message: "Community name is required",
              },
            ]}
            extra={<Paragraph text="Choose a unique name for your community" />}
          >
            <CustomInput placeholder="Enter community name..." />
          </Form.Item>

          <Form.Item
            name={"category"}
            label={
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                Category
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please choose a category",
              },
            ]}
          >
            <CustomSelect
              options={CommunityTypes}
              placeholder="Choose category"
            />
          </Form.Item>

          <Form.Item
            name={"visibility"}
            label={
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                Visibility
              </span>
            }
            rules={[{ required: true, message: "Please select visibility" }]}
          >
            <CustomSelect
              options={[
                { label: "Public", value: "public" },
                { label: "Private", value: "private" },
              ]}
              placeholder="Select visibility"
            />
          </Form.Item>

          <Form.Item
            name={"description"}
            label={
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                Description
              </span>
            }
            extra={
              <Paragraph text="Tell people what your community is about" />
            }
          >
            <CustomTextArea placeholder="Add description..." />
          </Form.Item>
        </div>

        <div className="mt-6">
          <ModalFooter
            setOpenModal={() => dispatch(setOpenCreateCommunityModal(false))}
            okText="Create Community"
            okBtnLoading={btnLoading}
            onCancel={resetForm}
        />
        </div>
      </Form>
    </motion.div>
  );
});

export default CreateForm;
