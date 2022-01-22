import React, { useState, useEffect } from "react";

export default function CircleScore(props) {
  const [number, setNumber] = useState(0);

  const fakePropsScore = 90;

  // Render circle animals
  const style = document.getElementsByTagName("style")[0];
  const fill = 490 - 472 * (fakePropsScore / 100);
  let keyframe = `@keyframes anim {100% {stroke-dashoffset: ${fill};}}`;
  style.sheet.insertRule(keyframe, 0);

  // Render number animation
  const numberInterval = 2000 / fakePropsScore;
  useEffect(() => number < fakePropsScore && setTimeout(() => setNumber(number + 1), numberInterval - 6, [number]));

  function getLight(score) {
    if (score >= 75) {
      return "#2FDD92";
    } else if (score >= 50) {
      return "#FC9918";
    } else {
      return "#FF7272";
    }
  }
  function getDark(score) {
    if (score > 75) {
      return "#125C13";
    } else if (score > 50) {
      return "#F14A16";
    } else {
      return "#9B0000";
    }
  }
  return (
    <div className="skill">
      <div className="outer">
        <div className="inner">
          <div id="number">{number}</div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stop-color={getLight(fakePropsScore)} />
            <stop offset="100%" stop-color={getDark(fakePropsScore)} />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r="70" stroke-linecap="round" />;
      </svg>
    </div>
  );
}
