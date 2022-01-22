import React, { useState } from "react";

export default function CircleScore() {
  const [number, setNumber] = useState(0);
  // let random = Math.floor(Math.random() * 101);
  let counter = 0;
  setInterval(() => {
    if (counter === 65) {
      clearInterval();
    } else {
      counter++;
      console.log(counter);
    }
  }, 200);

  return (
    <div className="skill">
      <div className="outer">
        <div className="inner">
          <div id="number" value={number}>
            {number}
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stop-color="#e91e63" />
            <stop offset="100%" stop-color="#673ab7" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r="70" stroke-linecap="round" />
      </svg>
    </div>
  );
}
