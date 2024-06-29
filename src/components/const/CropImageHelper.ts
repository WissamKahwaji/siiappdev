import { Area } from "react-easy-crop";

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  originalFileName: string
): Promise<File> {
  const image = new Image();
  image.src = imageSrc;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  image.width = canvas.width = pixelCrop.width;
  image.height = canvas.height = pixelCrop.height;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob(blob => {
        if (blob) {
          const file = new File([blob], originalFileName, {
            type: "image/jpeg",
          });
          resolve(file);
        } else {
          reject(new Error("Canvas is empty"));
        }
      }, "image/jpeg");
    };
    image.onerror = () => {
      reject(new Error("Image failed to load"));
    };
  });
}
