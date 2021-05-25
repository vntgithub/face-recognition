import TeacherHomeView from './views/teacherHome.view';
import { useSelector } from 'react-redux';
import AppBar from '../components/AppBar.component';
import { useHistory } from 'react-router';
import StudentHomeView from './views/studentHome.view';
import { useState, useEffect } from 'react';

const Home = () => {
    const history = useHistory();
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if(!token)
        history.push('/signin');
    const user = useSelector(state => state.user.userData);
    const groupsInStore = useSelector(state => state.group.data);
    const coursesInStore = useSelector(state => state.course.data);
    const isTeacher = user.isTeacher;
    const [groups, setGroups] = useState([]);
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        setGroups(groupsInStore);
        setCourses(coursesInStore);
    }, [groupsInStore, coursesInStore])
    return(
        <div>
            <AppBar setGroups={setGroups} groups={groups} />
            {isTeacher && <TeacherHomeView courses={courses} setCourses={setCourses} />}
            {!isTeacher && <StudentHomeView groups={groups} setGroups={setGroups} />}
        </div>
        
    )
}

export default Home;