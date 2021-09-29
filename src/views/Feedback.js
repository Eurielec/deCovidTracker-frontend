import React from "react";

import success from "../assets/success.svg";
import error from "../assets/error.svg";

function Feedback(props) {
  return (
    <div className="feedback-container">
      {props.icon === "failure" ? (
        <div className="feedback">
          <img src={error} alt="error" />
          <div className="additional">
            <h1>{props.title}</h1>
            <p>{props.description}</p>
          </div>
        </div>
      ) : (
        <div className="feedback">
          <img src={success} alt="success" />
          <div className="additional">
            <h1>{props.title}</h1>
            <p>{props.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feedback;
