import { Route, Switch } from "wouter";
import Home from "./views/Home";
import Login from "./views/Login";

function App() {
  return (
    <div id="wrapper">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
} 

export default App;
