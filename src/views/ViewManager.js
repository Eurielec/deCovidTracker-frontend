import React, { useState, Fragment } from "react";

import Form from "./Form";
import Feedback from "./Feedback";

function ViewManager(props) {
  const associationName = process.env.REACT_APP_ASSOCIATION_NAME || "Local";
  const [state, setState] = useState("form");
  return (
    <Fragment>
      {state === "form" ? (
        <Form
          operation={props.operation}
          association={props.match.params.association}
          setState={setState}
        />
      ) : null}
      {state === "success" ? (
        <Feedback
          icon="success"
          title={props.operation === "access" ? "Go ahead!" : "Bye!"}
          description="Any suggestions? Contact @d3vv3 on Telegram."
        />
      ) : null}
      {state === "full" ? (
        <Feedback
          icon="failure"
          title={
            props.operation === "access"
              ? `${associationName} is full!`
              : "Bye!"
          }
          association={props.match.params.association}
          description={`Max number of people already inside. If you think there is some issue, please contact @d3vv3 on Telegram.`}
        />
      ) : null}
      {state === "failure" ? (
        <Feedback
          icon="failure"
          association={props.match.params.association}
          title="Data was not valid!"
          description="If you think the is some issue, please contact @d3vv3 on Telegram."
        />
      ) : null}
      {state === "order" ? (
        <Feedback
          icon="failure"
          association={props.match.params.association}
          title={
            props.operation === "access"
              ? `The access event is not natural!`
              : "The exit event is not natural!"
          }
          description="Please contact your COVID admin an provide the timeframe you accessed the local."
        />
      ) : null}
    </Fragment>
  );
}

export default ViewManager;
