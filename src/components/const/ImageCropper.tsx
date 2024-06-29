import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";
import { FiUpload } from "react-icons/fi";
import getCroppedImg from "./CropImageHelper";
import { useTranslation } from "react-i18next";

interface ImageCropperProps {
  onCropComplete: (croppedFile: File) => void;
  aspect?: number | undefined;
  icon?: React.ReactNode;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  onCropComplete,
  aspect,
  icon = <FiUpload className="w-10 h-10 text-gray-400" />,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [originalFileName, setOriginalFileName] = useState<string | null>(null);

  const handleCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels);
      console.log(croppedArea.x);
    },
    []
  );

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result as string);
        setOriginalFileName(file.name);
      };
    }
  };

  const handleCropImage = useCallback(async () => {
    if (!croppedArea || !image || !originalFileName) {
      return;
    }
    try {
      const croppedFile = await getCroppedImg(
        image,
        croppedArea,
        originalFileName
      );
      onCropComplete(croppedFile);
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  }, [croppedArea, image, originalFileName, onCropComplete]);

  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-4">
        {image ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-gray-200 p-4 rounded-md max-w-full w-11/12 md:w-auto">
              <div className="relative w-full h-64 md:w-80 md:h-80">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                />
              </div>
              <div className="mt-4">
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={e => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="mt-4 flex justify-end gap-x-2">
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                  onClick={() => setImage(null)}
                >
                  {t("cancel")}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-secondary text-navBackground rounded-md"
                  onClick={handleCropImage}
                >
                  {t("crop")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-20 h-16 border-2 border-dashed rounded-md flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              onChange={handleSelectFile}
            />
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCropper;
