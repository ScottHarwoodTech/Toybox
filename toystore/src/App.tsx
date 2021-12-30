import { Router } from "./navigation/Router"
import { Navbar } from "./navigation/Navbar";
import { LocationProvider } from "@reach/router";
import 'semantic-ui-less/semantic.less'
import { Sidebar } from "semantic-ui-react";

export const App = () => (
  <LocationProvider>
    <Sidebar.Pushable>
      <Navbar />
      <Sidebar.Pusher>
        <Router />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </LocationProvider>
)
