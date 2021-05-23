import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCourse from '../components/AddCoures.component';
import { Container, Button } from '@material-ui/core';
import Course from '../components/Course.component';
import EditCourse from '../components/EditCourse.component';


import AppBar from '../components/AppBar.component';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
    divCourse: {
        margin: theme.spacing(3),
        display: 'inline-table'
    },
    divAddButton: {
        margin: theme.spacing(3),
        maxWidth: 345
    }
  }));
const Home = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if(!token)
        history.push('/signin');
    const history = useHistory();
    const classes = useStyles();
    const coursesInStore = useSelector(state => state.course.data);
    const [courses, setCourses] = useState([]);
    const [openAddCourse, setOpenAddcourse] = useState(false);
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
        setCourses(coursesInStore);
    })
    return(
        <div>
            <AppBar />
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
                    <div className={classes.divAddButton}>
                        <Button onClick={() => setOpenAddcourse(true)} variant="contained">Add course</Button>
                    </div>
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