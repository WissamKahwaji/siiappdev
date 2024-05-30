import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { PiHandsClappingLight } from "react-icons/pi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { PostModel } from "../../../apis/posts/type";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface ProfilePostProps {
  post: PostModel;
}

const ProfilePost: React.FC<ProfilePostProps> = ({ post }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const renderPostContent = () => {
    switch (post.postType) {
      case "image":
        return (
          <img
            src={post.images[0]}
            alt="post"
            className="absolute inset-0 object-contain w-full h-full bg-secondary/70"
          />
        );
      case "video":
        return (
          <div>
            {post.coverVideoImage ? (
              <img
                src={post.coverVideoImage}
                alt="coverVideo"
                className="absolute inset-0 object-contain w-full h-full bg-secondary/70"
              />
            ) : (
              <video
                src={post.postVideo}
                className="absolute inset-0 object-contain w-full h-full bg-secondary"
              />
            )}
          </div>
        );
      case "doc":
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full bg-navBackground/25">
            <Document
              file={{ url: post.postDocs ?? "" }}
              className="w-full h-full"
            >
              <Page pageNumber={1} width={300} />
            </Document>
            <div className="absolute bottom-0 left-0 w-full text-center bg-secondary   text-navBackground text-sm py-1">
              {post.postDocs ? post.postDocs.split("/").pop() : "Document"}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative overflow-hidden w-full ${
        post.postType === "video" ? "h-[200px] md:h-[400px]" : ""
      } pt-[100%]`}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <a href="#">
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
      </a>
      {renderPostContent()}
    </div>
  );
};

export default ProfilePost;
