import React from "react";

const VideoPlayer = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <video
        className="w-full rounded-lg shadow-lg"
        controls
        preload="metadata"
        aria-label="Video player"
      >
        <source
          src="https://videos.pexels.com/video-files/7871229/7871229-uhd_2732_1440_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
