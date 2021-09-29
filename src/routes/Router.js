import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ViewManager from "../views/ViewManager";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/access">
          <ViewManager operation="access" />
        </Route>
        <Route path="/exit">
          <ViewManager operation="exit" />
        </Route>
        <Route path="/">
          <p style={{ color: "white" }}>How did you even get here?</p>
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
