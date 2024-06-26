import { useGetUserByUserNameQuery } from "../../apis/account/queries";
import { useLocation, useParams } from "react-router-dom";
import ProfileHeader from "../../components/pages/profile/profileHeader";
import ProfilePosts from "../../components/pages/profile/profilePosts";
import { useEffect, useState } from "react";
import LoadingComponent from "../../components/const/LoadingComponent";
import { useTranslation } from "react-i18next";
import { useGetPostByIdQuery } from "../../apis/posts/queries";

import SendOfferModal from "../../components/const/SendOfferModal";

const Profile = () => {
  const { userName } = useParams<{ userName: string }>();
  const { t } = useTranslation();
  const {
    data: userInfo,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetUserByUserNameQuery(userName ?? "");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const discountType = queryParams.get("discountType");
  const postId = queryParams.get("postId");
  const { data: postInfo } = useGetPostByIdQuery(postId ?? "");

  const handleClick = () => {
    if (
      discountType &&
      discountType === "get_offer" &&
      userInfo?.socialMedia?.whatsApp
    ) {
      const phoneNumber = userInfo.socialMedia?.whatsApp;
      const whatsappLink = `https://wa.me/${phoneNumber}`;
      window.location.href = whatsappLink;
    } else {
      openModal();
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log("Fetching data for userName:", userName);
  }, [userName]);

  if (isLoadingUser) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <LoadingComponent />
      </div>
    );
  }

  if (isErrorUser) {
    return <div>Error loading profile.</div>;
  }

  return (
    <div className="container py-8 mx-auto relative">
      <main className="bg-background">
        {/* Fixed Button */}
        {discountType && (
          <div
            className="fixed md:top-[620px] top-[520px] left-0 right-0 z-50 flex justify-center"
            onClick={handleClick}
          >
            <button className="bg-secondary font-serif font-semibold text-navBackground w-3/4 md:w-1/2 py-1 px-10 rounded-md shadow-sm shadow-secondary">
              {t(discountType)}
            </button>
          </div>
        )}
        {userInfo && <ProfileHeader user={userInfo} />}
        {userInfo && <ProfilePosts userId={userInfo._id} />}
        <SendOfferModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          toEmail={postInfo?.owner?.email ?? ""}
          postCaption={postInfo?.caption ?? ""}
        />
      </main>
    </div>
  );
};

export default Profile;
