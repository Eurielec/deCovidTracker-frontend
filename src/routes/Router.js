import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ViewManager from "../views/ViewManager";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/access/:association"
          render={props => <ViewManager operation="access" {...props} />}
        />
        <Route
          exact
          path="/exit/:association"
          render={props => <ViewManager operation="exit" {...props} />}
        />
        <Route path="/access">
          <p style={{ color: "white" }}>
            How did you even get here? Please scan a valid QR code.
          </p>
        </Route>
        <Route path="/exit">
          <p style={{ color: "white" }}>
            How did you even get here? Please scan a valid QR code.
          </p>
        </Route>
        <Route path="/">
          <p style={{ color: "white" }}>How did you even get here?</p>
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
