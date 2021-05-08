import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignIn from './pages/signin.page';
import SignUp from './pages/signup.page';
import Home from './pages/home.page';
import EmptyPage from './pages/404.page';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/signup" component={SignUp} />
        <Route path="*" component={EmptyPage} />
      </Switch>
    </Router>
  );
}

export default App;
