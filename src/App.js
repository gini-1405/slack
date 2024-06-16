import React from "react";
import { SideBar } from "./component/sidebar/sidebar.component";
import Messages from "./component/Messages/Messages.component";
import { Grid } from "semantic-ui-react";
import "./App.css";
function App() {
  return (
    <Grid columns="equal">
      <SideBar />
      <Grid.Column className="messagepanel">
        <Messages />
      </Grid.Column>
      <Grid.Column width={3}>
        <span></span>
      </Grid.Column>
    </Grid>
  );
}
export default App;
