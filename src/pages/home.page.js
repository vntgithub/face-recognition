import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import {loginByToken} from '../slices/user';


import AppBar from '../components/AppBar.component';
import AddCourse from '../components/AddCoures.component';
import { unwrapResult } from '@reduxjs/toolkit';
import { getCourse } from '../slices/course';
import GridCourse from '../components/GridCourse.component';

const Home = () => {
    const [srcImg, setSrcImg] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [courses, setCourses] = useState([]);
    const [openAddCourse, setOpenAddcourse] = useState(false);
    const openAddCourseForm = () => setOpenAddcourse(!openAddCourse);
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
    return(
        <div>
            <AppBar 
            srcImg={srcImg} 
            nameUser={user.name} 
            isTeacher={user.isTeacher} 
            openAddCourseForm={openAddCourseForm}
            />
            {openAddCourse && <AddCourse />}
            {!openAddCourse &&
                <GridCourse courses={courses} />
            }
        </div>
        
    )
}

export default Home;