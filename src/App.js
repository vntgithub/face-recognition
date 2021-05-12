import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import SignIn from './pages/signin.page';
import SignUp from './pages/signup.page';
import Home from './pages/home.page';
import EmptyPage from './pages/404.page';
import Group from './pages/group.page';
import AppBar from './components/AppBar.component';
function App() {
  const [showAppBar, setShowAppBar] = useState(true);
  const [courses, setCourses] = useState([]);
  const [srcImg, setSrcImg] = useState('');
  const [user, setUser] = useState({});
  const [openAddCourse, setOpenAddcourse] = useState(false);
  const openAddCourseForm = () => setOpenAddcourse(!openAddCourse);
  useEffect(() => {
    const path = window.location.pathname;
    if(path === '/')
      setShowAppBar(true);
    else
      setShowAppBar(false);
  }, [showAppBar])
  return (
    <Router>
      {showAppBar && 
        <AppBar 
            setShowAppBar={setShowAppBar}
            srcImg={srcImg} 
            nameUser={user.name} 
            isTeacher={user.isTeacher} 
            openAddCourseForm={openAddCourseForm}
            />}
      <Switch>
        <Route exact path="/">
          <Home 
            setUser={setUser}
            setSrcImg={setSrcImg}
            setCourses={setCourses}
            setOpenAddcourse={setOpenAddcourse}
            openAddCourseForm={openAddCourseForm}
            openAddCourse={openAddCourse}
            courses={courses}
             />
        </Route>
        <Route exact path="/signin">
          <SignIn setShowAppBar={setShowAppBar} />
        </Route>
        <Route exact path="/group" component={Group}/>
        <Route exact path="/signup" component={SignUp} />
        <Route path="*" component={EmptyPage} />
      </Switch>
    </Router>
  );
}

export default App;
