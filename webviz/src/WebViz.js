import React, { useState, useEffect } from "react";
import Worldview, {
  Cubes,
  Axes,
  Text,
  Spheres,
  Cylinders,
  Arrows,
  Points,
} from "regl-worldview";

var truthFrameList = [];
var detectionFrameList = [];
var len = 0;
// text:

var actorColor = {
  t: {
    walker: { r: 1, g: 1, b: 0, a: 0.3 },
    vehicle: { r: 1, g: 0.8, b: 1, a: 0.3 },
  },
  d: {
    walker: { r: 1, g: 1, b: 0, a: 1 },
    vehicle: { r: 1, g: 0, b: 0, a: 1 },
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
      z: wp.center.z,
    });
    if (wp.right) {
      right.push({
        x: wp.right.x,
        y: -wp.right.y,
        z: wp.right.z,
      });
    }
    if (wp.left) {
      left.push({
        x: wp.left.x,
        y: -wp.left.y,
        z: wp.left.z,
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
        text: actor.type_id + " " + actor.id,
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
          x: actor.relative_position.x + (truthOrDet === "d" ? 0.6 : 0),
          y: -(actor.relative_position.y + (truthOrDet === "d" ? -0.8 : 0) ),
          z: (supertype ==="vehicle" ? 0 : 0.25 ) ,
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
  const [loaded, setLoaded] = useState(false);
  const [counter, setCounter] = useState(0);
  const [speed, setSpeed] = useState(30);
  const [forward, setForward] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [interval, setMyInterval] = useState(null);

  const onTruthFile = (event) => {
    let file = event.target.files[event.target.files.length - 1];
    if (file) {
      file.text().then((text) => {
        truthFrameList = JSON.parse(text);
        len = Math.max(truthFrameList.length, detectionFrameList.length);
        console.log(truthFrameList.length)
        setPlaying(false);
        setTLoaded(true);
        setLoaded(true);
        setCounter(0);
        console.log("loaded truth");
      });
    }
  };

  const onDetectionFile = (event) => {
    let file = event.target.files[event.target.files.length - 1];
    if (file) {
      file.text().then((text) => {
        detectionFrameList = JSON.parse(text);
        len = Math.max(truthFrameList.length, detectionFrameList.length);
        console.log(detectionFrameList.length)
        setPlaying(false);
        setDLoaded(true);
        setLoaded(true);
        setCounter(0);
        console.log("loaded detection");
      });
    }
  };

  const onPlay = () => {
    setPlaying((playing) => !playing);
  };

  const onForward = () => {
    setForward((forward) => !forward);
  };

  const onReset = () => {
    setPlaying(false);
    setCounter(0);
  };

  const onSpeed = () => {
    setSpeed((speed) => {
      if (speed === 5) {
        return 15;
      } else if (speed === 15) {
        return 30;
      } else if (speed === 30) {
        return 60;
      } else if (speed === 60) {
        return 120;
      } else if (speed === 120) {
        return 5;
      }
    });
  };

  const play = () => {
    setMyInterval(
      setInterval(() => {
        setCounter((counter) => {
          let newC = forward ? counter + 1 : counter - 1;
          newC = ((newC % len) + len) % len;
          console.log(newC);
          return newC;
        });
      }, 1000 / speed)
    );
  };

  const clear = () => {
    setMyInterval((interval) => {
      clearInterval(interval);

      return null;
    });
  };

  useEffect(() => {
    console.log("player effect");

    if (playing) {
      clear();
      play();
    } else if (!playing) {
      clear();
    }
  }, [playing, speed, forward]);

  let texts = [];
  let cylinders = [];
  let points = [];

  if (tLoaded) load(truthFrameList, "t", counter, texts, cylinders, points);
  if (dLoaded) load(detectionFrameList, "d", counter, texts, cylinders, points);

  useEffect(() => {
    if (!loaded) return;
    function onKey(e) {
      switch (e.code) {
        case "Digit1":
          onPlay();
          break;
        case "Digit2":
          onForward();
          break;
        case "Digit3":
          onSpeed();
          break;
        case "Digit4":
          onReset();
          break;
        default:
          break;
      }
    }

    document.addEventListener("keydown", onKey);

    return clear; // clear listener
  }, [loaded]);

  return (
    <Worldview
      defaultCameraState={{ thetaOffset: (Math.PI / 7) * 3 }}
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
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "180px",
            backgroundColor: "white",
          }}
        >
          Choose ground truth log:
          <input
            title="Choose frame list json file"
            type="file"
            id="file"
            onChange={onTruthFile}
          />
          Choose detection log:
          <input
            title="Choose frame list json file"
            type="file"
            id="file"
            onChange={onDetectionFile}
          />
          <button disabled={!loaded} onClick={onPlay}>
            Play/Pause (1)
          </button>
          <button disabled={!loaded} onClick={onForward}>
            Forward/Backward (2): {forward ? "forward" : "backward"}
          </button>
          <button disabled={!loaded} onClick={onSpeed}>
            Speed (3): {speed}fps
          </button>
          <button disabled={!loaded} onClick={onReset}>
            Reset (4)
          </button>
        </div>
        <h1
          style={{
            color: "white",
            margin: "1rem 1.5rem",
          }}
        >
          Frame: {tLoaded ? truthFrameList[counter].frame : "-"}
          <br/>
          Real time: {(counter/30.0).toFixed(1)}s
        </h1>
      </div>
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
          },{
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
  );
}
