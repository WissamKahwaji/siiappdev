import { useParams } from "react-router-dom";
import { useGetUserByUserNameQuery } from "../../../apis/account/queries";
import { SyncLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

const AboutUsPage = () => {
  const { userName } = useParams<{ userName: string }>();
  const { t } = useTranslation();
  const {
    data: userInfo,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetUserByUserNameQuery(userName ?? "");

  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <SyncLoader size={20} />
      </div>
    );
  }

  if (isErrorUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">
          Error loading profile. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center py-12 font-header">
      <div className="bg-navBackground/90 shadow-lg rounded-lg p-8 md:w-2/3 w-11/12">
        {userInfo?.userAbout?.aboutUs && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-6 border-b border-secondary pb-2 ">
              {t("about_us")}
            </h2>
            <p className="text-white whitespace-pre-wrap leading-relaxed">
              {userInfo.userAbout.aboutUs}
            </p>
          </section>
        )}
        {userInfo?.userAbout?.ourMission && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-6 border-b border-secondary pb-2">
              {t("our_mission")}
            </h2>
            <p className="text-white whitespace-pre-wrap leading-relaxed">
              {userInfo.userAbout.ourMission}
            </p>
          </section>
        )}
        {userInfo?.userAbout?.ourVision && (
          <section>
            <h2 className="text-3xl font-bold text-secondary mb-6 border-b border-secondary pb-2">
              {t("our_vision")}
            </h2>
            <p className="text-white whitespace-pre-wrap leading-relaxed">
              {userInfo.userAbout.ourVision}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default AboutUsPage;
