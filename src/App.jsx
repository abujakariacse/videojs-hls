// Don't remove any of this imports
import React, { useRef, useState, useEffect } from "react";
import videojs from "video.js";
import _ from "videojs-contrib-quality-levels";
import qualitySelector from "videojs-hls-quality-selector";
import "video.js/dist/video-js.css";

const VideoPlayerHLS = () => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [videoDuration, setVideoDuration] = useState(1);
  const [currentDuration, setCurrentDuration] = useState(0);

  const [videoEnd, setVideoEnd] = useState(false);

  const thumbnailURL =
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ0-c7yjk-bYo_6zeYIIBjRTyw_ydv4INXysGR7VSJAO_4B9wyx";

  const liveURL =
    "https://vz-b4f1e97e-483.b-cdn.net/65c65840-de66-4c27-afd0-a3b5a904b768/playlist.m3u8 ";

  // const liveURL =
  //   "http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8  ";

  useEffect(() => {
    if (player) {
      player.src({
        src: liveURL,
        type: "application/x-mpegURL",
        withCredentials: false,
      });
      player.poster(thumbnailURL);
    }
  }, [liveURL, thumbnailURL, player]);

  useEffect(() => {
    const videoJsOptions = {
      autoplay: false,
      preload: "auto",
      controls: true,
      poster: thumbnailURL,
      sources: [
        {
          src: liveURL,
          type: "application/x-mpegURL",
          withCredentials: false,
        },
      ],
      html5: {
        nativeAudioTracks: true,
        nativeVideoTracks: true,
        nativeTextTracks: true,
      },
    };

    const videoPlayerInstance = videojs(
      videoRef.current,
      videoJsOptions,
      function onPlayerReady() {
        setPlayer(videoPlayerInstance);
      }
    );

    // console.log(videoPlayerInstance.qualityLevels());

    return () => {
      if (player) player.dispose();
    };
  }, []);

  useEffect(() => {
    if (player) {
      player.hlsQualitySelector({ displayCurrentQuality: true });
    }
  }, [player]);

  useEffect(() => {
    setVideoEnd(currentDuration >= videoDuration);
  }, [currentDuration, videoDuration]);

  return (
    <div
      className="video-player-container"
      data-vjs-player
      style={{
        maxWidth: "800px",
        height: "700px",
        width: "100%",
      }}
    >
      <video
        ref={videoRef}
        className="vidPlayer video-js vjs-default-skin vjs-big-play-centered"
        onLoadedMetadata={(e) => {
          setVideoDuration(e.target?.duration);
        }}
        onTimeUpdate={(e) => {
          setCurrentDuration(e.target?.currentTime);
        }}
      ></video>
    </div>
  );
};

export default VideoPlayerHLS;
