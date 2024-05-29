type LoginToastProps = {
  onClose: () => void;
};
const LoginToast = ({ onClose }: LoginToastProps) => {
  return (
    <div className="flex items-center space-y-2 flex-col">
      <p className="">You are not authenticated.</p>
      <button
        onClick={onClose}
        className="text-navBackground bg-secondary px-3 py-1 rounded-full shadow-lg shadow-navBackground/20 underline"
      >
        Log In
      </button>
    </div>
  );
};

export default LoginToast;
