import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

export default function Comment(props) {
  if (props.score === 0) {
    return <Spinner className="mb-2 mx-auto" animation="border" variant="secondary" />;
  } else if (props.score > 75) {
    return (
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Well Done! 🌲</h4>
        <p>Thanks for making the world a better place!</p>
      </div>
    );
  } else if (props.score > 55) {
    return (
      <div className="alert alert-warning" role="alert">
        <h4 className="alert-heading">Not bad. 🤔</h4>
        <p>You can do better. Checkout the companies below!</p>
      </div>
    );
  } else {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Oof.</h4>
        <p>Don't worry, it's not too late to shop somewhere else!</p>
      </div>
    );
  }
}
