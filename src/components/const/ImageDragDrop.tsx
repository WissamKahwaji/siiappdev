import { useState, useRef, useEffect } from "react";
import { useField } from "formik";

interface ImageDragDropFieldProps {
  name: string;
  label: string;
  oldImg?: string;
}

const ImageDragDropField: React.FC<ImageDragDropFieldProps> = ({
  name,
  label,
  oldImg,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [field, meta, helper] = useField({ name });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (oldImg) {
      setImgSrc(oldImg);
    }
  }, [oldImg]);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const imgSrc = URL.createObjectURL(file);
      setImgSrc(imgSrc);
      helper.setValue(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imgSrc = URL.createObjectURL(file);
      setImgSrc(imgSrc);
      helper.setValue(file);
    }
  };

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  return (
    <div className="h-36 w-full text-center relative" onDragEnter={handleDrag}>
      <label
        id={`label-${name}`}
        htmlFor={name}
        className={`h-full flex items-center justify-center border-2 ${
          dragActive ? "border-gray-400" : "border-gray-200"
        } bg-white rounded-sm relative`}
        style={{
          overflow: "hidden",
          borderColor: meta.error ? "red" : "secondary",
        }}
      >
        <div className="flex items-center justify-center space-x-16 px-4">
          <img
            src={
              imgSrc
                ? imgSrc
                : field.value
                ? URL.createObjectURL(field.value)
                : oldImg
            }
            alt="upload"
            className="object-cover w-full max-w-24 md:max-w-36"
            // style={{ width: "100%", maxWidth: "8rem", maxHeight: "8rem" }}
          />
          <div className="bg-navBackground text-secondary rounded-lg   md:px-3 py-1">
            <p className="text-xs md:text-sm">{label}</p>
            <button
              className="cursor-pointer p-0 md:p-2 md:w-40 w-full h-fit text-xs bg-transparent text-gray-500"
              onClick={onButtonClick}
            >
              Drag and drop or Upload
            </button>
          </div>
        </div>
      </label>

      <input
        ref={inputRef}
        type="file"
        id={name}
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />

      {dragActive && (
        <div
          className="absolute inset-0 w-full h-full rounded-lg"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </div>
  );
};

export default ImageDragDropField;
