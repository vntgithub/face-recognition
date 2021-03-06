import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useEffect } from 'react';
import SignIn from './pages/signin.page';
import SignUp from './pages/signup.page';
import Home from './pages/home.page';
import ListLessonPage from './pages/listlesson.page';
import EmptyPage from './pages/404.page';
import Group from './pages/group.page';
import { useDispatch } from 'react-redux';
import {loginByToken} from './slices/user';
import { unwrapResult } from "@reduxjs/toolkit";
import { getCourse } from './slices/course';
import { getGroupByStudentId } from './slices/group'
import FaceRecognitionPage from "./pages/face-reacognition.page";
import HistoryRecognitionPage from './pages/historyrecognition.page'
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkTokenAndSignIn =  async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if(token){
            const rsAction = await dispatch(loginByToken(token));
            const userData = unwrapResult(rsAction);
            if(!userData.isTeacher)
              await dispatch(getGroupByStudentId(userData['_id']))
            else
              await dispatch(getCourse(userData['_id']));
        }
    }
    
    checkTokenAndSignIn(); 
}, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/group" component={Group}/>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path='/group/lesson' component={ListLessonPage} />
        <Route exact path='/face-recognition' component={FaceRecognitionPage} />
        <Route exact path='/history-recognition' component={HistoryRecognitionPage} />
        <Route path="*" component={EmptyPage} />
      </Switch>
    </Router>
  );
}

export default App;
