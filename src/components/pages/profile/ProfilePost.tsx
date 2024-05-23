import { faComment } from "@fortawesome/free-solid-svg-icons";
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
            className="absolute inset-0 object-contain w-full h-full"
          />
        );
      case "video":
        return (
          <video
            src={post.postVideo}
            className="absolute inset-0 object-contain w-full h-full"
          />
        );
      case "doc":
        return (
          <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-navBackground/25">
            <Document
              file={{ url: post.postDocs ?? "" }}
              className="w-full h-full"
            >
              <Page pageNumber={1} width={300} />
            </Document>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div
      className="relative overflow-hidden w-full pt-[100%]"
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
            <FontAwesomeIcon icon={faComment} />
            <span>{post.comments?.length ?? 0}</span>
          </div>
        </div>
      </a>
      {renderPostContent()}
    </div>
  );
};

export default ProfilePost;
