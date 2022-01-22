import logo from './logo.svg';
import './App.css';

function App() {

  const getCurrentTab = async () => {
    console.log("getting tab")
    // let queryOptions = { active: true, currentWindow: true };
    // let [tab] = await chrome.tabs.query(queryOptions);
    // console.log("tab");
    // return tab;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>Alex Test</div>
        <button onClick={getCurrentTab}>Test console</button>
      </header>
    </div>
  );
}

export default App;
