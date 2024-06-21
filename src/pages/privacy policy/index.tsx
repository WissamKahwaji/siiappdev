import { useTranslation } from "react-i18next";
import { useGetPrivacyPolicyQuery } from "../../apis/privacy_policy/queries";
import LoadingComponent from "../../components/const/LoadingComponent";

const PrivacyPolicyPage = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const {
    data: privacyPolicyInfo,
    isLoading,
    isError,
  } = useGetPrivacyPolicyQuery();

  if (isLoading) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <LoadingComponent />
      </div>
    );
  }

  if (isError) return <div>Error loading data...</div>;

  return (
    <div className="flex flex-col font-header mx-5 md:mx-10 md:mt-12 py-10 md:pb-10">
      <h1 className="text-center font-serif text-3xl text-navBackground font-bold">
        {t("privacy_policy")}
      </h1>
      <p className="mt-10 font font-header leading-9 text-lg whitespace-pre-wrap">
        {selectedLang === "en"
          ? privacyPolicyInfo?.titleEn
          : privacyPolicyInfo?.titleAr}
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
