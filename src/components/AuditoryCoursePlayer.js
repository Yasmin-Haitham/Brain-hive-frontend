import React from "react";
import ReactAudioPlayer from "react-audio-player";
import "../AuditoryCoursePlayer.css";
const AuditoryCoursePlayer = ({ audioSrc }) => {
  return (
    <div className="audio">
      <ReactAudioPlayer src={audioSrc} controls />
    </div>
  );
};

export default AuditoryCoursePlayer;
