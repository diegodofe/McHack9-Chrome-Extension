/* global chrome */
import React from "react";
import CardComp from "./CardComp";

export default function App() {
  const testFunction = async () => {
    try {
      let queryOptions = { active: true, currentWindow: true };
      chrome.tabs.query(queryOptions, function (res) {
        console.log(res)
      })
      console.log("Testing console")
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <CardComp />
      <button onClick={testFunction}>Test console</button>
    </div>
  );
}

// /* global chrome */
// async function getCurrentTab() {
//   let queryOptions = { active: true, currentWindow: true };
//   chrome.tabs.getCurrent(tab => {
//     console.log(tab)
//   })
//   return "hi";
// }

// chrome.runtime.onInstalled.addListener(async () => {
//   console.log("testing2")
//   console.log(await getCurrentTab());
// });

// chrome.runtime.onInstalled.addListener((reason) => {
//   console.log("testing1")
//   if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
//     chrome.tabs.create({
//       url: 'onboarding.html'
//     });
//   }
// });
