/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "react-router-dom";
import {
  useEditFolderMutation,
  useGetFolderByIdQuery,
} from "../../apis/folder/queries";
import LoadingComponent from "../../components/const/LoadingComponent";
import { Formik, FormikHelpers } from "formik";
import { FolderOrPostProps } from "../../apis/folder/type";
import { useState, useEffect } from "react";
import ImageCropper from "../../components/const/ImageCropper";

const EditFolderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  // const userId = localStorage.getItem("userId");
  // const { t } = useTranslation();
  const {
    data: folderInfo,
    isLoading,
    isError,
  } = useGetFolderByIdQuery(id ?? "");
  const { mutate: editFolderInfo } = useEditFolderMutation();

  const initialValues: FolderOrPostProps = {
    _id: folderInfo?._id ?? "",
    name: folderInfo?.name ?? "",
    caption: folderInfo?.caption ?? "",
    link: folderInfo?.link ?? "",
    mobileNumber: folderInfo?.mobileNumber ?? "",
    whatsAppNumber: folderInfo?.whatsAppNumber ?? "",
    coverImg: folderInfo?.coverImg ?? "",
    folderImages: folderInfo?.images ?? [],
    removeImages: [],
  };
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const [croppedImageDataUrl, setCroppedImageDataUrl] = useState<string>(
    initialValues.coverImg ?? ""
  );
  const handleCropComplete = (
    croppedFile: File,
    setFieldValue: any,
    fieldValue: string
  ) => {
    setCroppedImageFile(croppedFile);
    console.log(croppedImageFile?.name);
    if (!croppedFile) {
      return;
    }
    setFieldValue(fieldValue, croppedFile);
    const reader = new FileReader();
    reader.readAsDataURL(croppedFile);
    reader.onloadend = () => {
      setCroppedImageDataUrl(reader.result as string);
      // setIsCropperOpen(false);
    };
  };

  const [folderImagesPreview, setFolderImagesPreview] = useState<string[]>(
    initialValues.folderImages ?? []
  );
  const [removeImages, setRemoveImages] = useState<string[]>([]);

  useEffect(() => {
    if (folderInfo) {
      setCroppedImageDataUrl(folderInfo.coverImg ?? "");
      setFolderImagesPreview(folderInfo.images);
    }
  }, [folderInfo]);

  const handleSubmit = (
    values: FolderOrPostProps,
    { setSubmitting }: FormikHelpers<FolderOrPostProps>
  ) => {
    const finalValues = {
      ...values,
      removeImages: removeImages,
    };
    editFolderInfo(finalValues, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  const handleFolderImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).map(file =>
        URL.createObjectURL(file)
      );
      setFolderImagesPreview(folderImagesPreview.concat(fileArray));
      setFieldValue("folderImages", Array.from(files));
    }
  };
  const handleRemoveImage = (image: string) => {
    // Find the original URL of the image to remove
    const originalImageUrl = folderInfo?.images.find(img =>
      img.includes(image)
    );

    if (originalImageUrl) {
      // Update removeImages state with the URL to remove
      setRemoveImages(prevRemoveImages => [
        ...prevRemoveImages,
        originalImageUrl,
      ]);
    }

    // Update folderImagesPreview state by filtering out the removed image
    setFolderImagesPreview(prevPreview =>
      prevPreview.filter(img => img !== image)
    );
  };
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
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Folder</h1>
      <div className="flex justify-center md:w-1/2 md:mx-auto">
        <div className="bg-white p-10 rounded-lg shadow-lg border border-secondary w-full mx-2">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="folderName"
                  >
                    Folder Name
                  </label>
                  <input
                    id="folderName"
                    name="name"
                    type="text"
                    className="px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    style={{ direction: "ltr" }}
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="caption"
                  >
                    Caption
                  </label>
                  <textarea
                    id="caption"
                    name="caption"
                    className="px-4 py-2 border border-secondary h-32 rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.caption ?? ""}
                    style={{ direction: "ltr" }}
                  />
                  {errors.caption && touched.caption && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.caption}
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="link"
                  >
                    Link
                  </label>
                  <input
                    id="link"
                    name="link"
                    type="text"
                    className="px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.link}
                    style={{ direction: "ltr" }}
                  />
                  {errors.link && touched.link && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.link}
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="mobileNumber"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="text"
                    className="px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.mobileNumber}
                    style={{ direction: "ltr" }}
                  />
                  {errors.mobileNumber && touched.mobileNumber && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.mobileNumber}
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="whatsAppNumber"
                  >
                    WhatsApp Number
                  </label>
                  <input
                    id="whatsAppNumber"
                    name="whatsAppNumber"
                    type="text"
                    className="px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.whatsAppNumber}
                    style={{ direction: "ltr" }}
                  />
                  {errors.whatsAppNumber && touched.whatsAppNumber && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.whatsAppNumber}
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="coverImg"
                  >
                    Cover Image
                  </label>
                  {/* {coverImagePreview && (
                    <img
                      src={coverImagePreview}
                      alt="Cover"
                      className="mb-2 w-fit h-48 object-cover rounded-lg"
                    />
                  )} */}
                  <div className="flex w-full justify-start items-center">
                    <ImageCropper
                      aspect={1}
                      onCropComplete={croppedFile => {
                        handleCropComplete(
                          croppedFile,
                          setFieldValue,
                          "folderCoverImg"
                        );
                      }}
                    />
                    {croppedImageDataUrl && (
                      <div className="mt-4">
                        <img
                          src={croppedImageDataUrl}
                          alt="folder_image"
                          className="w-80 h-56 md:h-auto object-contain border border-secondary mt-4"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    className="mb-2 text-sm font-medium text-gray-700"
                    htmlFor="folderImages"
                  >
                    Folder Images
                  </label>
                  <div className="flex flex-wrap">
                    {folderImagesPreview.map((image, index) => (
                      <div key={index} className="relative m-1">
                        <img
                          src={image}
                          alt={`Folder Image ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(image)}
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    id="folderImages"
                    name="folderImages"
                    type="file"
                    accept="image/*"
                    multiple
                    className="px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={e => handleFolderImagesChange(e, setFieldValue)}
                  />
                  {errors.folderImages && touched.folderImages && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.folderImages}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-secondary text-navBackground font-semibold rounded-lg hover:bg-navBackground hover:text-secondary transition duration-300"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditFolderDetailsPage;
