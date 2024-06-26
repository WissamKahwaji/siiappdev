import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface GetSiiCardModalProps {
  userName: string | null;
}
const GetSiiCardModal = ({ userName }: GetSiiCardModalProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-start items-center space-y-7 font-header">
      <p className=" font-semibold">
        {t("you_do_not_have__card_to_get_this_offer")}
      </p>
      <Link to={`/get-sii-card/${userName}`}>
        <div className="p-4 font-serif bg-secondary rounded-lg">
          {t("request_your_sii_card")}
        </div>
      </Link>
    </div>
  );
};

export default GetSiiCardModal;
