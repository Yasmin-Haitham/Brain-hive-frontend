import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url, className }) => {
  return (
    <ReactPlayer
      url={url}
      className={className}
      playing
      controls
      // The below styles are necessary to maintain aspect ratio for the player
      style={{ position: "absolute", marginTop:"50px"}}
      width='50%'
      height='70%'
    />
  );
};

export default VideoPlayer;
