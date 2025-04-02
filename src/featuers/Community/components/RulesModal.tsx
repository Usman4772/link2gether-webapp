import CustomButton from "@/components/Global/CustomButton";
import { CustomCheckbox } from "@/components/Global/CustomFormFields";
import CustomModal from "@/components/Global/CustomModal";
import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import { Form, Input } from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { AiOutlineDelete } from "react-icons/ai";
import useUpdateCommunity from "../hooks/useUpdateCommunity";

interface RulesModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | number;
}

function RulesModal({ openModal, setOpenModal, id }: RulesModalProps) {
  const rulesRef = useRef<any>(null);
  return (
    <CustomModal
      width={500}
      openModal={openModal}
      onCancel={rulesRef.current?.resetForm}
      setOpenModal={setOpenModal}
      body={<RulesForm id={id} setOpenModal={setOpenModal} ref={rulesRef} />}
    />
  );
}

export default RulesModal;

interface RulesFormProps {
  id: string | number;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RulesForm = forwardRef<any, RulesFormProps>(function RulesForm(
  { id, setOpenModal },
  ref
) {
  const [form] = Form.useForm();
  const [merge, setMerge] = useState<any>(false);
  const { addNewRules, rulesLoading } = useUpdateCommunity({
    id: id,
    setOpenModal,
    form,
    reset: resetForm,
  });

  function resetForm() {
    form.resetFields();
    setMerge(false);
  }

  useImperativeHandle(ref, () => ({
    resetForm,
  }));

  return (
    <Form
      form={form}
      name="rules_form"
      onFinish={(values) => {
        const payload = {
          rules: values.rules,
          merge: merge,
        };
        addNewRules(payload);
      }}
      layout="vertical"
      className="flex items-start justify-center gap-4 flex-col "
    >
      <Heading text="Add Rules" />
      <Form.List name="rules" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...field}
                style={{ margin: 0 }}
                className="!mb-4 w-full  py-1  custom-form-item"
                name={[field.name, "rule"]}
                key={field.key}
                rules={[
                  {
                    required: true,
                    message: "Please add new rule or delete this field",
                  },
                ]}
              >
                <div className="flex items-center w-full justify-between">
                  <Input
                    placeholder="Add new rule"
                    className="p-2 !rounded-none !border !border-b-black !border-t-0 !border-r-0 !border-l-0 !shadow-none !outline-none !ring-0"
                    style={{ boxShadow: 'none' }}
                  />
                  {fields.length > 1 && (
                    <AiOutlineDelete
                      className="cursor-pointer text-lg hover:text-red-400"
                      onClick={() => remove(field.name)}
                    />
                  )}
                </div>
              </Form.Item>
            ))}
            <div className="w-full flex items-center justify-start">
              <CustomButton
                text="Add more"
                variant={"primary"}
                onClick={() => {
                  add();
                }}
              />
            </div>
          </>
        )}
      </Form.List>

      <div className="flex items-center justify-end w-full  gap-2">
        <Paragraph text="Do you want to merge these rules with already added?" />
        <CustomCheckbox
          onChange={(checked) => setMerge(checked)}
          value={merge}
        />
      </div>
      <div className="w-full flex items-center justify-end">
        <CustomButton
          text="Submit"
          loading={rulesLoading}
          type="submit"
          variant={"secondary"}
        />
      </div>
    </Form>
  );
});

export { RulesForm };
