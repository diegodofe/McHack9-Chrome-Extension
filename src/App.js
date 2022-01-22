import logo from './logo.svg';
import './App.css';

function App() {

  const testFunction = () => {

    console.log("Testing console.log")
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = tabs[0].url;
      console.log(url)
    });
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
        <button onClick={testFunction}>Test console</button>
      </header>
    </div>
  );
}

export default App;
