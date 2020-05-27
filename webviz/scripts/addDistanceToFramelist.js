"use strict";

const fs = require("fs");

let rawdata = fs.readFileSync("frameList.json");
let frameList = JSON.parse(rawdata);

// frameList.forEach((frame) => {
//   frame.actors.forEach((actor) => {
//     actor.distance = Math.sqrt(
//       Math.pow(parseFloat(actor.relative_position.x),2) +
//         Math.pow(parseFloat(actor.relative_position.y),2)
//     );
//   });
// });

fs.writeFileSync("minframeList.json", JSON.stringify(frameList), "utf8");
