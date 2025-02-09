"use client";
import CustomModal from "@/components/Global/CustomModal";
import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppSelector";
import { setOpenCreateCommunityModal } from "@/redux/Slices/create.community.slice";
import { motion } from "framer-motion";
import Image from "next/image";
import { forwardRef, useRef } from "react";
import CreatePostForm from "./CreatPostForm";

const images = ["/education.jpg", "/music.jpg", "/technology.jpg"];

export default function CreatePostModal({
  openModal,
  setOpenModal,
  id,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | number;
}) {

  const formRef = useRef<any>(null);
  return (
    <>
      <CustomModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        body={
          <CreatePostModalBody
            ref={formRef}
            id={id}
            setOpenModal={setOpenModal}
          />
        }
        width={1000}
        footer={null}
        className="custom-modal"
        // onCancel={() => formRef.current?.resetForm()}
      />
    </>
  );
}

interface CreateFormProps {
  props?: any;
}

const CreatePostModalBody = forwardRef<CreateFormProps, any>(
  function CreatePostModalBody({ setOpenModal,id }, ref) {
    return (
      <div className="flex flex-col lg:flex-row w-full h-full">
        <div className="lg:w-1/2 h-full overflow-y-auto bg-slate-200 text-black">
          <div className="p-6">
            <div className="flex flex-col py-4">
              <Heading text="Create a Post" />
              <Paragraph text="Create a post and share it with your community. Let's see what you have got." />
            </div>
            <div className="w-full space-y-4">
              {images.map((image, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.1 },
                  }}
                  whileHover={{
                    scale: 1.05,
                    zIndex: 100,
                  }}
                  className="rounded-xl p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden flex gap-4"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt="community images"
                    width={500}
                    height={500}
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                  />
                  <div className="py-2">
                    <Heading text="Art" />
                    <Paragraph text="Join together, grow together. Create your community and connect with like-minded people." />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 h-full overflow-y-auto">
          <CreatePostForm setOpenModal={setOpenModal} id={id} ref={ref} />
        </div>
      </div>
    );
  }
);
