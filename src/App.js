import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import signinPage from './pages/signin.page';
import signupPage from './pages/signup.page';
function App() {
  return (
    <Router>
      {document.location.pathname === '/' && <h1>Home</h1>}
      <Switch>
        <Route exact path="/signin" component={signinPage}/>
        <Route exact path="/signup" component={signupPage} />
      </Switch>
    </Router>
  );
}

export default App;
