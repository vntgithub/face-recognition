import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TeacherHomeView from './views/teacherHome.view';

import AppBar from '../components/AppBar.component';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import StudentHomeView from './views/studentHome.view';

const Home = () => {
    const history = useHistory();
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if(!token)
        history.push('/signin');
    const user = useSelector(state => state.user.userData);
    const isTeacher = user.isTeacher;
    const [groups, setGroups] = useState([]);
    
    return(
        <div>
            <AppBar setGroups={setGroups} groups={groups} />
            {isTeacher && <TeacherHomeView />}
            {!isTeacher && <StudentHomeView groups={groups} setGroups={setGroups} />}
        </div>
        
    )
}

export default Home;