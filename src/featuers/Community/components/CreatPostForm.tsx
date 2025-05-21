import Uploader from "@/components/Global/Uploader";

import { Loader2 } from "lucide-react";
import React, { forwardRef, useImperativeHandle } from "react";
import useCreatePostConfig from "../hooks/useCreatePostConfig";
import useCreateCommunity from "../hooks/useCreateCommunity";
import useCreatePost from "../hooks/useCreatePost";
import CustomButton from "@/components/Global/CustomButton";
import { motion } from "framer-motion";
import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import { Divider, Form } from "antd";
import ModalFooter from "@/components/Global/ModalFooter";
import { CustomTextArea } from "@/components/Global/AntDesignFormFields";

interface CreatePostFormProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | number;
}

const CreatePostForm = forwardRef<any, CreatePostFormProps>(
  function CreatePostForm({ setOpenModal, id }, ref) {
    const [form] = Form.useForm();
    const { fileList, setFileList, btnLoading, createPost } = useCreatePost({
      form,
      id,
      setOpenModal,
    });

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
          <Heading text="Create Post" size="23px" />
          <Paragraph text="Join together, grow together. Connect with like-minded people." />

          <Divider className="my-4 border-neutral-200 dark:border-neutral-700" />
        </div>

        <Form layout="vertical" form={form} onFinish={createPost}>
          <div className="w-full flex items-center justify-center mb-6">
            <Uploader
              fileList={fileList}
              setFileList={setFileList}
              accept={"video/*,image/*"}
              placeholder={"Media"}
            />
          </div>

          <div className="space-y-4">
            <Form.Item
              name={"description"}
              label={
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  Description
                </span>
              }
              extra={<Paragraph text="Post description" />}
            >
              <CustomTextArea placeholder="Add description..." />
            </Form.Item>
          </div>

          <div className="mt-6">
            <ModalFooter
              setOpenModal={setOpenModal}
              okText="Create Post"
              okBtnLoading={btnLoading}
              onCancel={resetForm}
            />
          </div>
        </Form>
      </motion.div>
    );
  }
);

export default CreatePostForm;
