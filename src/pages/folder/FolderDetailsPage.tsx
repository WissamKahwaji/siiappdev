import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useDeleteFolderMutation,
  useGetFolderByIdQuery,
} from "../../apis/folder/queries";
import LoadingComponent from "../../components/const/LoadingComponent";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";

import { MdDelete, MdEdit } from "react-icons/md";

const FolderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = localStorage.getItem("userId");
  const { t } = useTranslation();
  const {
    data: folderInfo,
    isLoading,
    isError,
  } = useGetFolderByIdQuery(id ?? "");
  const { mutate: deleteFolderInfo } = useDeleteFolderMutation(
    folderInfo?.owner.userName ?? ""
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteFolder = () => {
    if (folderInfo?._id) deleteFolderInfo(folderInfo?._id);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <LoadingComponent />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading folder.</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl font-header mt-20">
      <div className="bg-white shadow-md border border-secondary rounded-lg p-8">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex items-center mb-4">
            <img
              src={folderInfo?.owner.profileImage}
              alt={folderInfo?.owner.fullName}
              className="w-12 h-12 rounded-lg border-2 border-secondary shadow-md shadow-secondary/50 mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {folderInfo?.owner.fullName}
              </h2>
              <p className="text-sm text-secondary">
                @{folderInfo?.owner.userName}
              </p>
            </div>
          </div>
          {userId === folderInfo?.owner._id && (
            <div className="flex flex-row gap-x-2 items-center">
              <Link
                to={`/${folderInfo.owner.userName}/folders/${folderInfo._id}/edit`}
              >
                <div className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-secondary rounded-md cursor-pointer">
                  <MdEdit />
                </div>
              </Link>
              <div
                className="md:w-8 md:h-8 w-8 h-8 flex justify-center items-center bg-red-600 rounded-md cursor-pointer"
                onClick={openModal}
              >
                <MdDelete className="text-white" />
              </div>
            </div>
          )}
        </div>

        <h1 className="text-xl font-bold mb-2">{folderInfo?.name}</h1>
        <p className="text-sm mb-2 text-gray-700 whitespace-pre-wrap">
          {folderInfo?.caption}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  sm:grid-cols-3   my-5">
          {folderInfo?.images.map((image, index) => (
            <div
              key={index}
              className="relative group rounded-lg border-2 border-secondary shadow-md shadow-secondary/50 p-2 md:h-[300px] h-[200px] flex items-center justify-center cursor-pointer"
            >
              <img
                src={image}
                alt={`Folder image ${index + 1}`}
                className="object-contain w-full h-full transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <button
                  className="text-white bg-navBackground rounded-full px-4 py-2"
                  onClick={() => window.open(image, "_blank")}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-serif font-semibold mb-1 text-secondary">
            Contact Information
          </h3>

          {folderInfo?.whatsAppNumber && (
            <p
              className="cursor-pointer text-sm"
              onClick={() => {
                const sanitizedNumber = folderInfo?.whatsAppNumber?.replace(
                  /\s+/g,
                  ""
                );
                window.open(`https://wa.me/${sanitizedNumber}`, "_blank");
              }}
            >
              <div className="flex flex-row">
                <span className="font-bold">{`${t(
                  "whatsApp_number"
                )} : `}</span>
                <p
                  style={{ direction: "ltr" }}
                >{`${folderInfo?.whatsAppNumber}`}</p>
              </div>
            </p>
          )}
          {folderInfo?.mobileNumber && (
            <Link to={`tel:${folderInfo?.mobileNumber}`}>
              <p className="text-sm mt-2">
                <div className="flex flex-row">
                  <span className="font-bold">{`${t(
                    "mobile_number"
                  )} : `}</span>
                  <p style={{ direction: "ltr" }}>
                    {` ${folderInfo?.mobileNumber}`}
                  </p>
                </div>
              </p>
            </Link>
          )}
          {folderInfo?.link && (
            <Link
              to={folderInfo?.link}
              target="_blank"
              className="cursor-pointer font-bold text-sm text-blue-500"
            >
              <p className="mt-2">{` ${folderInfo?.link}`}</p>
            </Link>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-bold mb-4">
            {t("delete_folder_confirm")}
          </h2>
          <p className="mb-4">{t("delete_folder_warning")}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              {t("no")}
            </button>
            <button
              onClick={() => {
                handleDeleteFolder();
                closeModal();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              {t("yes")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FolderDetailsPage;
