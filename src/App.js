import logo192 from "./logo192.png";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {

  const testFunction = async () => {
    try {
      console.log("Testing console")
      chrome.tabs.query()
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo192} className="App-logo" alt="brand-logo" />
        <Button variant="success" onClick={testFunction}>Test console</Button>
      </header>
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