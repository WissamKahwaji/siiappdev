import React from "react";

type VideoPlayerProps = {
  videoUrl: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = videoUrl => {
  return (
    <div className="flex flex-col justify-start items-start border rounded-lg p-3">
      <h2 className="text-gray-400 mb-3">Course Preview</h2>
      <video
        src={videoUrl.videoUrl}
        controls
        controlsList="nodownload"
        width="100%"
        height="250"
      ></video>
    </div>
  );
};

export default VideoPlayer;
