import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { PiHandsClappingLight } from "react-icons/pi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { PostModel } from "../../../apis/posts/type";
import { useTranslation } from "react-i18next";

// import { Document, Page, pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface ProfilePostProps {
  post: PostModel;
  isVideo: boolean;
}

const ProfilePost: React.FC<ProfilePostProps> = ({ post, isVideo }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const { t } = useTranslation();
  const renderPostContent = () => {
    switch (post.postType) {
      case "image":
        return (
          <div>
            <img
              src={post.images[0]}
              alt="post"
              className="absolute inset-0 object-contain w-full h-full "
            />
            {post.discountPercentage && post.discountPercentage > 0 && (
              <div className="absolute bottom-2 w-full md:px-2 px-1 bg-transparent ">
                <div className=" md:p-3 p-1 bg-secondary">
                  <div className="w-full flex flex-row justify-between items-center ">
                    <p className="text-blue-500 font-bold md:text-sm text-[8px]">
                      <span className="font-semibold text-black ">
                        {`${t("discount")} : `}
                      </span>{" "}
                      {post.discountPercentage}%
                    </p>
                    {/* <MdOutlineKeyboardArrowRight size={24} /> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "video":
        return (
          <div>
            {post.coverVideoImage ? (
              <img
                src={post.coverVideoImage}
                alt="coverVideo"
                className="absolute inset-0 object-cover w-full h-full"
              />
            ) : (
              <video
                src={post.postVideo}
                className="absolute inset-0 object-fill w-full h-full"
              />
            )}
          </div>
        );
      case "doc":
        // return (
        //   <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full bg-navBackground/25">
        //     <Document
        //       file={{ url: post.postDocs ?? "" }}
        //       className="w-full h-full border-2 border-secondary"
        //     >
        //       <Page pageNumber={1} width={280} />
        //     </Document>
        //     <div className="absolute bottom-0 left-0 w-full text-center bg-secondary text-navBackground text-xs md:text-sm py-1 line-clamp-1">
        //       {post.postDocs ? post.postDocs.split("/").pop() : "Document"}
        //     </div>
        //   </div>
        // );
        return (
          <div
            className="absolute inset-0 object-contain w-full h-full"
            onClick={() => window.open(post.postDocs, "_blank")}
          >
            <img
              src={
                post.coverPdfImage ?? "https://techterms.com/img/lg/pdf_109.png"
              }
              alt="PDF Icon"
              className="w-full object-contain"
            />
            <div className="absolute bottom-0 flex items-center justify-center left-0 w-full bg-secondary bg-opacity-75 text-navBackground font-semibold text-center p-2 text-[8px]  md:text-base">
              <img
                src="https://techterms.com/img/lg/pdf_109.png"
                alt=""
                className="md:w-7 md:h-7 md:mr-2 w-5 h-5 mr-1"
              />
              <p className="line-clamp-2">
                {post.postDocs ? post.postDocs.split("/").pop() : "Document"}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative overflow-hidden  ${
        isVideo ? "h-[200px] md:h-[400px] md:w-[226px] w-[114px]" : "w-full"
      } pt-[100%]`}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <div
        className={`bg-gray-800 bg-opacity-60 h-full w-full absolute inset-0 z-10 flex items-center justify-center text-white ${
          showOverlay ? "" : "hidden"
        }`}
      >
        <div className="flex items-center space-x-4">
          <PiHandsClappingLight className="w-5 h-5" />
          <span>{post.likes?.length ?? 0}</span>
          <FontAwesomeIcon icon={faBookmark} />
          <span>{post.saves?.length ?? 0}</span>
        </div>
      </div>

      {renderPostContent()}
    </div>
  );
};

export default ProfilePost;
