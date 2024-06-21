import { LegacyRef } from "react";

interface QrCodeUserProps {
  qrCodeUrl: string | undefined;
  userName: string;
  qrCodeRef?: LegacyRef<HTMLDivElement> | undefined;
}

const QrCodeUser = ({ qrCodeUrl, userName, qrCodeRef }: QrCodeUserProps) => {
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
