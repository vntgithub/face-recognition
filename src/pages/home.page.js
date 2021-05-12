import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCourse from '../components/AddCoures.component';
import { Container } from '@material-ui/core';
import Course from '../components/Course.component';
import EditCourse from '../components/EditCourse.component';
import { useDispatch } from 'react-redux';
import {loginByToken} from '../slices/user';
import { unwrapResult } from '@reduxjs/toolkit';
import { getCourse } from '../slices/course';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
    divCourse: {
        margin: theme.spacing(3),
        display: 'inline-table'
    }
  }));
const Home = (props) => {
    const dispatch = useDispatch();
    const { setUser, setSrcImg } = props;
    const classes = useStyles();
    const history = useHistory();
    const { setCourses, courses, setOpenAddcourse, openAddCourse } = props;
    const [group, setGroup] = useState([]);
    const [openEditCourse, setOpenEditcourse] = useState(false);
    const [courseWantEdit, setCourseWantEdit] = useState({});
    const openEditCourseForm = (courseSelect, index) => {
        return () => {
            setCourseWantEdit({courseSelect, index});
            setOpenEditcourse(true)
        }
    }
    const back = () => setOpenEditcourse(false);
    const backAddForm = () => setOpenAddcourse(false);
    const updateArrayCourseAfterDelete = (indexWantDelete) => {
        let newCourses = [...courses];
        newCourses.splice(indexWantDelete, 1)
        setCourses(newCourses);
    }
    const updateArrayCourseAfterEdit = (data) => {
        const index = data.index;
        const courseNeedUpdate = data.course;
        let newCourses = [...courses];
        newCourses.splice(index, 1, courseNeedUpdate);
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
    }, [])
    return(
        <div>
            {openAddCourse && 
                <AddCourse 
                    backAddForm={backAddForm} 
                    setCourses={setCourses} 
                    courses={courses} />}
            {openEditCourse && 
                <EditCourse 
                    updateArrayCourseAfterEdit={updateArrayCourseAfterEdit} 
                    courseWantEdit={courseWantEdit}
                    back={back}
                />}
            {!openAddCourse && !openEditCourse &&
                <Container maxWidth="lg">
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