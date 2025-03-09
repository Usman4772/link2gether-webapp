"use client";

import { useState } from "react";
import { Modal } from "antd";
import { Check, Copy, Facebook, Instagram, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShareModal({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [copied, setCopied] = useState(false);
  const url = "https://example.com/shared-content";

  const handleCancel = () => {
    setOpenModal(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareToInstagram = () => {
    // Instagram doesn't have a direct share URL like Facebook
    // Usually, you'd need to use their API or direct users to copy and share manually
    alert(
      "Instagram sharing typically requires their app. Copy the link and share it on Instagram."
    );
  };

  const shareToWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  return (
    <div className="flex justify-center">
      <Modal
        title={null}
        open={openModal}
        onCancel={handleCancel}
        footer={null}
        closeIcon={<X className="text-gray-500 hover:text-gray-700" />}
        className="max-w-md"
        centered
      >
        <div className="p-2">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Share this content
            </h3>
            <p className="text-gray-500">
              Share this content with your friends and network
            </p>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            <button
              onClick={shareToFacebook}
              className="flex flex-col items-center gap-2 transition-transform hover:scale-110"
            >
              <div className="bg-blue-600 text-white p-3 rounded-full">
                <Facebook className="h-6 w-6" />
              </div>
              <span className="text-sm text-gray-600">Facebook</span>
            </button>

            <button
              onClick={shareToInstagram}
              className="flex flex-col items-center gap-2 transition-transform hover:scale-110"
            >
              <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white p-3 rounded-full">
                <Instagram className="h-6 w-6" />
              </div>
              <span className="text-sm text-gray-600">Instagram</span>
            </button>

            <button
              onClick={shareToWhatsApp}
              className="flex flex-col items-center gap-2 transition-transform hover:scale-110"
            >
              <div className="bg-green-500 text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">WhatsApp</span>
            </button>
          </div>

          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 px-4 py-3 outline-none text-gray-700 bg-gray-50"
              />
              <button
                onClick={copyToClipboard}
                className={`px-4 py-3 flex items-center gap-2 ${
                  copied ? "bg-green-500" : "bg-purple-500"
                } text-white transition-colors duration-300`}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy URL
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
