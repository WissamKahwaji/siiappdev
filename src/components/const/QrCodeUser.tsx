import { LegacyRef, useEffect, useRef } from "react";
interface QrCodeUserProps {
  qrCodeUrl: string | undefined;
  userName: string;
  qrCodeRef?: LegacyRef<HTMLDivElement> | undefined;
}

const QrCodeUser = ({ qrCodeUrl, userName, qrCodeRef }: QrCodeUserProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrCodeUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Ensure cross-origin images are handled correctly
      img.src = qrCodeUrl;
      img.onload = () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = img.width + 16; // Adjust for border size
            canvas.height = img.height + 16;
            ctx.fillStyle = "#E5E7EB"; // Border color
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 8, 8, img.width, img.height); // Center the image
          }
        }
      };
    }
  }, [qrCodeUrl]);
  return (
    <div className="flex items-center justify-center p-4">
      {qrCodeUrl ? (
        <div
          className="flex flex-col justify-center items-center w-52"

          // onClick={handleSaveAsImage}
        >
          <div className="w-full h-full p-2" ref={qrCodeRef}>
            <img
              src={qrCodeUrl}
              alt="User QR Code"
              className="w-full h-full border-4 border-secondary shadow-sm shadow-secondary mb-2"
            />
          </div>
          <p className="text-lg font-serif text-navBackground">{userName}</p>
        </div>
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  );
};

export default QrCodeUser;
