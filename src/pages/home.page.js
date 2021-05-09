import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import {loginByToken} from '../slices/user';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar.component';
import AddCourse from '../components/AddCoures.component';
import { unwrapResult } from '@reduxjs/toolkit';
import { getCourse } from '../slices/course';
import { Container } from '@material-ui/core';
import Course from '../components/Course.component';
import EditCourse from '../components/EditCourse.component';
const useStyles = makeStyles((theme) => ({
    divCourse: {
        margin: theme.spacing(3),
        display: 'inline-table'
    },
  }));
const Home = () => {
    const classes = useStyles();
    const [srcImg, setSrcImg] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [courses, setCourses] = useState([]);
    const [openAddCourse, setOpenAddcourse] = useState(false);
    const [openEditCourse, setOpenEditcourse] = useState(false);
    const [courseWantEdit, setCourseWantEdit] = useState({});
    const openAddCourseForm = () => setOpenAddcourse(!openAddCourse);
    const openEditCourseForm = (courseSelect) => {
        return () => {
            setCourseWantEdit(courseSelect);
            setOpenEditcourse(!openEditCourse)
        }
    }
    const updateArrayCourseAfterDelete = (indexWantDelete) => {
        let newCourses = [...courses];
        newCourses.splice(indexWantDelete, 1)
        setCourses(newCourses);
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
    return(
        <div>
            <AppBar 
            srcImg={srcImg} 
            nameUser={user.name} 
            isTeacher={user.isTeacher} 
            openAddCourseForm={openAddCourseForm}
            />
            {openAddCourse && <AddCourse setCourses={setCourses} courses={courses} />}
            {openEditCourse && 
                <EditCourse 
                    setCourses={setCourses} 
                    courses={courses}
                    courseWantEdit={courseWantEdit}
                />}
            {!openAddCourse && !openEditCourse &&
                <Container maxWidth="lg">
                    {/* <GridCourse courses={courses} /> */}
                    {courses.map((item, index) => 
                    <div className={classes.divCourse} key={index} >
                        <Course 
                            index={index} 
                            course={item} 
                            updateArrayCourseAfterDelete={updateArrayCourseAfterDelete} 
                            openEditCourseForm={openEditCourseForm}
                        />
                    </div>
                    )}
                </Container>
            }
        </div>
        
    )
}

export default Home;