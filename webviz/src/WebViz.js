import React, { useState, useEffect, useRef } from "react";
import Worldview, {
  Cubes,
  Axes,
  Text,
  Cylinders,
  Arrows,
  Points,
} from "regl-worldview";

let path = "rendering/3";

var truthFrameList = [];
var detectionFrameList = [];
var len = 0;
// text:

var actorColor = {
  t: {
    walker: { r: 1, g: 0.8, b: 1, a: 0.5 },
    vehicle: { r: 1, g: 0.8, b: 1, a: 0.5 },
  },
  d: {
    walker: { r: 1, g: 0.5, b: 0, a: 1 },
    vehicle: { r: 0, g: 0.8, b: 0, a: 1 },
  },
};

var actorScale = {
  walker: { x: 0.5, y: 0.5, z: 2 },
  vehicle: { x: 3, y: 3, z: 1.5 },
};

function load(frameList, truthOrDet, counter, texts, cylinders, points) {
  let center = [];
  let right = [];
  let left = [];
  if (!frameList[counter]) return;
  frameList[counter].waypoints.forEach((wp) => {
    center.push({
      x: wp.center.x,
      y: -wp.center.y,
      z: 0,
    });
    if (wp.right) {
      right.push({
        x: wp.right.x,
        y: -wp.right.y,
        z: 0,
      });
    }
    if (wp.left) {
      left.push({
        x: wp.left.x,
        y: -wp.left.y,
        z: 0,
      });
    }
  });

  points.push({
    points: center,
    scale: { x: 6, y: 6, z: 6 },
    color: { r: 0, g: 0, b: 1, a: 1 },
    pose: {
      position: { x: 0, y: 0, z: 0 },
      orientation: { x: 0, y: 0, z: 0, w: 1 },
    },
  });
  points.push({
    points: right,
    scale: { x: 6, y: 6, z: 6 },
    color: { r: 1, g: 1, b: 1, a: 1 },
    pose: {
      position: { x: 0, y: 0, z: 0 },
      orientation: { x: 0, y: 0, z: 0, w: 1 },
    },
  });
  points.push({
    points: left,
    scale: { x: 6, y: 6, z: 6 },
    color: { r: 1, g: 1, b: 1, a: 1 },
    pose: {
      position: { x: 0, y: 0, z: 0 },
      orientation: { x: 0, y: 0, z: 0, w: 1 },
    },
  });

  frameList[counter].actors.forEach((actor) => {
    let type = actor.type_id.split(".")[0];
    let supertype = "vehicle";
    if (
      type === "vehicle" ||
      type === "car" ||
      type === "bicycle" ||
      type === "motorcycle" ||
      type === "bus" ||
      type === "truck" ||
      type === "train"
    )
      supertype = "vehicle";
    else if (type === "walker" || type === "person") supertype = "walker";

    if (truthOrDet === "d") {
      texts.push({
        text:
          actor.type_id +
          " " +
          actor.id +
          " ~" +
          actor.distance.toFixed(1) +
          "m",
        pose: {
          position: {
            x: actor.relative_position.x,
            y: -actor.relative_position.y,
            z: actor.relative_position.z + 2,
          },
        },
        scale: { x: 1, y: 1, z: 1 },
      });
    }
    cylinders.push({
      pose: {
        orientation: { x: 0, y: 0, z: 0, w: 1 },
        position: {
          x: actor.relative_position.x,
          y: -actor.relative_position.y,
          z: supertype === "vehicle" ? 0 : 0.25,
        },
      },
      scale: actorScale[supertype],
      color: actorColor[truthOrDet][supertype],
    });
  });
}

export default function WebViz() {
  const [tLoaded, setTLoaded] = useState(false);
  const [dLoaded, setDLoaded] = useState(false);
  const [counter, setCounter] = useState(0);
  const [speed, setSpeed] = useState(30);
  const [playing, setPlaying] = useState(false);
  const [interval, setMyInterval] = useState(null);

  const videoEl1 = useRef(null);
  const videoEl2 = useRef(null);
  const videoEl3 = useRef(null);
  const [video, setVideo] = useState(1);

  useEffect(() => {
    const onTruthFile = (data) => {
      truthFrameList = data;
      len = Math.max(truthFrameList.length, detectionFrameList.length);
      console.log(truthFrameList.length);
      setPlaying(false);
      setTLoaded(true);
      setCounter(0);
      console.log("loaded truth");
    };

    const onDetectionFile = (data) => {
      detectionFrameList = data;
      len = Math.max(truthFrameList.length, detectionFrameList.length);
      console.log(detectionFrameList.length);
      setPlaying(false);
      setDLoaded(true);
      setCounter(0);
      console.log("loaded detection");
    };

    fetch(path + "/detected.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        onDetectionFile(data);
      })
      .catch((err) => {});
    fetch(path + "/frameList.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        onTruthFile(data);
      })
      .catch((err) => {});
  }, []);

  const onPlay = () => {
    setPlaying((playing) => !playing);
  };

  const onReset = () => {
    setPlaying(false);
    setCounter(0);
    videoEl1.current.currentTime = 0;
    videoEl2.current.currentTime = 0;
    videoEl3.current.currentTime = 0;
  };

  const onSpeed = () => {
    setSpeed((speed) => {
      if (speed === 15) {
        videoEl1.current.playbackRate = 0.5;
        videoEl2.current.playbackRate = 0.5;
        videoEl3.current.playbackRate = 0.5;
        return 30;
      } else if (speed === 30) {
        videoEl1.current.playbackRate = 1;
        videoEl2.current.playbackRate = 1;
        videoEl3.current.playbackRate = 1;
        return 60;
      } else if (speed === 60) {
        videoEl1.current.playbackRate = 2;
        videoEl2.current.playbackRate = 2;
        videoEl3.current.playbackRate = 2;
        return 120;
      } else if (speed === 120) {
        videoEl1.current.playbackRate = 4;
        videoEl2.current.playbackRate = 4;
        videoEl3.current.playbackRate = 4;
        return 15;
      }
    });
  };

  useEffect(() => {
    const controlVideo = (videoEl, simTime) => {
      if (videoEl.current.currentTime > simTime) {
        videoEl.current.pause();
        if (simTime === 0) {
          videoEl.current.currentTime = 0;
        }
      } else {
        videoEl.current.play();
      }
    };

    const play = () => {
      videoEl1.current.play();
      videoEl2.current.play();
      videoEl3.current.play();
      setMyInterval(
        setInterval(() => {
          setCounter((counter) => {
            let simTime = counter / 30;
            controlVideo(videoEl1, simTime);
            controlVideo(videoEl2, simTime);
            controlVideo(videoEl3, simTime);
            let newC = counter + 1;
            newC = ((newC % len) + len) % len;
            return newC;
          });
        }, 1000 / speed)
      );
    };

    const clear = () => {
      setMyInterval((interval) => {
        clearInterval(interval);
        videoEl1.current.pause();
        videoEl2.current.pause();
        videoEl3.current.pause();
        return null;
      });
    };

    if (playing) {
      clear();
      play();
    } else if (!playing) {
      clear();
    }

    return clear; // clear listener
  }, [playing, speed]);

  let texts = [];
  let cylinders = [];
  let points = [];

  if (tLoaded) load(truthFrameList, "t", counter, texts, cylinders, points);
  if (dLoaded) load(detectionFrameList, "d", counter, texts, cylinders, points);

  useEffect(() => {
    function onKey(e) {
      switch (e.code) {
        case "Digit1":
          onPlay();
          break;
        // case "Digit2":
        //   onForward();
        //   break;
        case "Digit2":
          onSpeed();
          break;
        case "Digit3":
          onReset();
          break;
        default:
          break;
      }
    }

    document.addEventListener("keydown", onKey);
  }, [tLoaded, dLoaded]);

  return (
    <div className="app">
      <div className="videoContainer">
        <video
          style={{ zIndex: video === 0 ? 1 : 0 }}
          src={path + "/output.webm"}
          ref={videoEl1}
        ></video>
        <video
          style={{ zIndex: video === 1 ? 1 : 0 }}
          src={path + "/outputDET.webm"}
          ref={videoEl2}
        ></video>
        <video
          style={{ zIndex: video === 2 ? 1 : 0 }}
          src={path + "/outputDP.webm"}
          ref={videoEl3}
        ></video>
        <div className="videoControl">
          <p>Video:</p>
          <button onClick={() => setVideo(0)}>
            {video === 0 ? <strong>Original</strong> : "Original"}
          </button>
          <button onClick={() => setVideo(1)}>
            {video === 1 ? <strong>Detection</strong> : "Detection"}
          </button>
          <button onClick={() => setVideo(2)}>
            {video === 2 ? <strong>Depth map</strong> : "Depth map"}
          </button>
        </div>
      </div>
      <div className="webViz">
        <div className="controlBoard">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button disabled={!tLoaded && !dLoaded} onClick={onPlay}>
              Play/Pause <strong>(1)</strong>
            </button>
            <button disabled={!tLoaded && !dLoaded} onClick={onSpeed}>
              Speed <strong>(2)</strong>: <strong>{speed}fps</strong>
            </button>
            <button disabled={!tLoaded && !dLoaded} onClick={onReset}>
              Reset <strong>(3)</strong>
            </button>
          </div>
          <div
            style={{
              margin: "1rem 1.5rem",
            }}
          >
            <h1>
              Frame: {tLoaded ? truthFrameList[counter].frame : "-"}
              <br />
              Simulation time: {(counter / 30.0).toFixed(1)}s
            </h1>
            <p>
              <span class="gv"></span>
              <span class="gw"></span> Ground truth
            </p>
            <p>
              <span class="dv"></span>
              <span class="dw"></span> Detected
            </p>
            <p>Use your mouse!</p>
            <p>Left click move camera</p>
            <p>Right click tilt camera</p>
            <p>Scroll to zoom</p>
          </div>
        </div>
        <div className="worldView">
          <Worldview
            defaultCameraState={{
              distance: 37.40851758105467,
              fovy: 0.7853981633974483,
              phi: 1.1931202979777147,
              thetaOffset: 1.3685363026390311,
            }}
            keyMap={{
              KeyA: "moveLeft",
              KeyD: "moveRight",
              KeyE: "rotateRight",
              KeyF: "tiltUp",
              KeyQ: "rotateLeft",
              KeyR: "tiltDown",
              KeyS: "moveDown",
              KeyW: "moveUp",
              KeyX: "zoomOut",
              KeyZ: "zoomIn",
            }}
          >
            <Cubes>
              {[
                {
                  pose: {
                    orientation: { x: 0, y: 0, z: 0, w: 1 },
                    position: {
                      x: 0,
                      y: 0,
                      z: 0,
                    },
                  },
                  scale: { x: 4, y: 1.8, z: 1.5 },
                  // rgba values are between 0 and 1 (inclusive)
                  color: { r: 1, g: 0, b: 0, a: 1 },
                },
              ]}
            </Cubes>

            <Points>{points}</Points>
            <Cylinders>{cylinders}</Cylinders>
            <Text autoBackgroundColor>{texts}</Text>

            <Axes />
            <Arrows>
              {[
                {
                  pose: {
                    orientation: { x: 1, y: 0, z: 0, w: 0 },
                    position: { x: 0, y: 0, z: 0 },
                  },
                  scale: { x: 10, y: 0.8, z: 0.8 },
                  color: { r: 1, g: 1, b: 1, a: 1 },
                },
              ]}
            </Arrows>
            <Text autoBackgroundColor>
              {[
                {
                  text: "X 50m",
                  pose: {
                    position: { x: 50, y: 0, z: 0 },
                  },
                  scale: { x: 1, y: 1, z: 1 },
                },
                {
                  text: "Y 50m",
                  pose: {
                    position: { x: 0, y: -50, z: 0 },
                  },
                  scale: { x: 1, y: 1, z: 1 },
                },
                {
                  text: "Z 25m",
                  pose: {
                    position: { x: 0, y: 0, z: 25 },
                  },
                  scale: { x: 1, y: 1, z: 1 },
                },
                {
                  text: "X 100m",
                  pose: {
                    position: { x: 100, y: 0, z: 0 },
                  },
                  scale: { x: 1, y: 1, z: 1 },
                },
                {
                  text: "Y 100m",
                  pose: {
                    position: { x: 0, y: -100, z: 0 },
                  },
                  scale: { x: 1, y: 1, z: 1 },
                },
              ]}
            </Text>
          </Worldview>
        </div>
      </div>
    </div>
  );
}
