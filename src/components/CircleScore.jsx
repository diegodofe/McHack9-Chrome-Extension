import React, { useState, useEffect } from "react";

export default function CircleScore(props) {
  const [number, setNumber] = useState(0);

  useEffect(() => number < props.consumerScore && setTimeout(() => setNumber(number + 1), 2000 / props.consumerScore - 6, [number]));

  function getLight(score) {
    if (score > 75) {
      return "#2FDD92";
    } else if (score > 55) {
      return "#FFC900";
    } else {
      return "#FF7260";
    }
  }
  function getDark(score) {
    if (score > 75) {
      return "#125C13";
    } else if (score > 55) {
      return "#FC9918";
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
            <stop offset="0%" stopColor={getLight(props.consumerScore)} />
            <stop offset="100%" stopColor={getDark(props.consumerScore)} />
          </linearGradient>
        </defs>
        <circle style={{ strokeDashoffset: 490 - 472 * (number / 100) }} cx="80" cy="80" r="70" strokeLinecap="round" />;
      </svg>
    </div>
  );
}
