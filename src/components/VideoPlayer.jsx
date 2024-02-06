import React, { useRef, useState, useEffect, Fragment } from "react";
import videojs from "video.js";
import _ from "videojs-contrib-quality-levels";
import qualitySelector from "videojs-hls-quality-selector";
import "video.js/dist/video-js.css";

// those imports are important

const VideoPlayerHLS = () => {
  const videoRef = useRef();
  const [player, setPlayer] = useState(undefined);
  const [callFinishVideoAPI, setCallFinishVideoAPI] = useState(false);
  const [vidDuration, setVidDuration] = useState(50000);
  const videoId = "e2280eeb-4cdb-43e7-a34f-36868326b8cb";
  const thumbnailURL =
    "https://vz-a2adf92d-b24.b-cdn.net/e2280eeb-4cdb-43e7-a34f-36868326b8cb/thumbnail.jpg";
  const liveURL =
    "https://vz-b4f1e97e-483.b-cdn.net/65c65840-de66-4c27-afd0-a3b5a904b768/playlist.m3u8";
  useEffect(() => {
    if (player) {
      player.src({
        src: liveURL,
        type: "application/x-mpegURL",
        withCredentials: false,
      });
      player.poster("");
      setCallFinishVideoAPI(false);
      setVidDuration(50000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, liveURL, thumbnailURL]);

  useEffect(() => {
    if (callFinishVideoAPI) {
      //finishesVideo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callFinishVideoAPI]);

  useEffect(() => {
    const videoJsOptions = {
      autoplay: false,
      preload: "auto",
      controls: true,
      poster: "",
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

    const p = videojs(
      videoRef.current,
      videoJsOptions,
      function onPlayerReady() {
        // console.log('onPlayerReady');
      }
    );

    setPlayer(p);
    console.log(p.qualityLevels());
  }, []);

  useEffect(() => {
    if (player) {
      player.hlsQualitySelector({ displayCurrentQuality: true });
    }
  }, [player]);
  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        onLoadedMetadata={(e, px) => {
          // console.log(e.target.duration);
          setVidDuration(e.target.duration);
        }}
        onTimeUpdate={(e) => {
          if (e.target.currentTime >= vidDuration - 10) {
            setCallFinishVideoAPI(true);
          }
        }}
        className="vidPlayer video-js vjs-default-skin vjs-big-play-centered"
      ></video>
    </div>
  );
};

export default VideoPlayerHLS;
