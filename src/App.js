import logo192 from "./logo192.png";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo192} className="App-logo" alt="brand-logo" />
        <Button variant="success">Test console</Button>
      </header>
    </div>
  );
}
