import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {loginByToken} from './slices/user';
import { unwrapResult } from '@reduxjs/toolkit';
import { getCourse } from './slices/course';
import { useState } from 'react';
import SignIn from './pages/signin.page';
import SignUp from './pages/signup.page';
import Home from './pages/home.page';
import EmptyPage from './pages/404.page';
import AppBar from './components/AppBar.component';
function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [srcImg, setSrcImg] = useState('');
  const [user, setUser] = useState({});
  const [openAddCourse, setOpenAddcourse] = useState(false);
  const openAddCourseForm = () => setOpenAddcourse(!openAddCourse);
  const checkUrl = () => {
    const path = window.location.pathname;
    if(path === '/')
      return true;
    return false;
  }
  useEffect(() => {
    const checkTokenAndSignIn =  async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if(token){
            const rsLoginAction = await dispatch(loginByToken(token));
            const data = unwrapResult(rsLoginAction);
            setUser(data);
            setSrcImg(data.img);

            const rsGetCourseAction = await dispatch(getCourse(data['_id']));
            const coursesArray = unwrapResult(rsGetCourseAction);
            setCourses(coursesArray);

        }else{
            history.push('/signin');
        }
    }
    checkTokenAndSignIn();
},[]);
  return (
    <Router>
      {checkUrl() && 
        <AppBar 
            srcImg={srcImg} 
            nameUser={user.name} 
            isTeacher={user.isTeacher} 
            openAddCourseForm={openAddCourseForm}
            />}
      <Switch>
        <Route exact path="/">
          <Home 
            setCourses={setCourses}
            setOpenAddcourse={setOpenAddcourse}
            openAddCourseForm={openAddCourseForm}
            openAddCourse={openAddCourse}
            courses={courses}
             />
        </Route>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/signup" component={SignUp} />
        <Route path="*" component={EmptyPage} />
      </Switch>
    </Router>
  );
}

export default App;
