import { useTranslation } from "react-i18next";

type LoginToastProps = {
  onClose: () => void;
};
const LoginToast = ({ onClose }: LoginToastProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center space-y-2 flex-col">
      <p className="">{t("you_are_not_authenticated")}</p>
      <button
        onClick={onClose}
        className="text-navBackground bg-secondary px-3 py-1 rounded-full shadow-lg shadow-navBackground/20 underline"
      >
        {t("login")}
      </button>
    </div>
  );
};

export default LoginToast;
