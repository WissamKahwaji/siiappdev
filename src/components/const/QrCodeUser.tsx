interface QrCodeUserProps {
  qrCodeUrl: string | undefined;
  userName: string;
}

const QrCodeUser = ({ qrCodeUrl, userName }: QrCodeUserProps) => {
  return (
    <div className="flex items-center justify-center p-4">
      {qrCodeUrl ? (
        <div className="flex flex-col justify-center items-center">
          <img
            src={qrCodeUrl}
            alt="User QR Code"
            className="w-52 h-fit border-2 border-secondary shadow-sm shadow-secondary mb-2 "
          />
          <p className="text-lg font-serif text-navBackground">{userName}</p>
          {/* <Link
            to={`https://siiappdev.siidevelopment.com/${userName}/qrcode-info`}
          >
            <p className="text-sm font-body text-blue-500">{`https://siiappdev.siidevelopment.com/${userName}/qrcode-info`}</p>
          </Link> */}
        </div>
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  );
};

export default QrCodeUser;
