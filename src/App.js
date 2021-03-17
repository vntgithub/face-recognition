import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import signinPage from './pages/signin.page';
function App() {
  return (
    <Router>
      {document.location.pathname === '/' && <h1>Home</h1>}
      <Switch>
        <Route exact path="/login" component={signinPage}/>
      </Switch>
    </Router>
  );
}

export default App;
