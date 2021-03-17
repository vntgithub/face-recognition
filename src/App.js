import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import loginPage from './pages/login.page';
function App() {
  const home = <h1>Home</h1>;
  return (
    <Router>
      
      <Switch>
        <Route exact path="/" component={home} />
        <Route exact path="/login" component={loginPage}/>
      </Switch>
    </Router>
  );
}

export default App;
