import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {
    Avatar, Button, CssBaseline, TextField, IconButton,
    Grid, Fab, Container, List, ListItem, ListItemText
  } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
  
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

import '../pages/style/style.css';
import courseApi from '../api/course.api';
import { addCourse } from '../slices/course';
import { unwrapResult } from '@reduxjs/toolkit';

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      
    },
    spaceingAndWith: {
      margin: theme.spacing(2, 4, 1, 0),
      minWidth: 285
    } ,
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(3),
      minWidth: 300,
    },
    hidden: {
      display: 'none'
    },
    marginLeft: {
      margin: theme.spacing(2, 0, 2, 8)
    },
    mediumWidth: {
      minWidth: 150
    }, 
    maxWidthInPut: {
        margin: theme.spacing(2, 4, 1, 0),
        minWidth: 450
      } ,
      marginTop: {
        margin: theme.spacing(2, 0, 0, 0),
      }
  }));
const EditCourse = (props) => {
    const id = useSelector(state => state.user.userData['_id']);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [success, setSuccess] = useState(false);
    const [codeErrString, setCodeErrString] = useState('Code is require, use 5 characters or more for your code.');
    const [data, setData] = useState({...props.courseWantEdit})
    const [err, setErr] = React.useState({
        name: false,
        code: false,
        lesson: false
      });
    const regexCode = /^[a-zA-Z0-9]{5,}$/;
    const getName = (e) => setData({...data, name: e.target.value});
    const getCode = (e) => setData({...data, code: e.target.value});
    const getLesson = (e) => {
        const lessonName = document.getElementById('lesson').value;
        if(lessonName === '')
            return;
        setData({...data, lessons: [...data.lessons, lessonName]});
        document.getElementById('lesson').value = '';
    }
    const deleteLesson = (index) => {
        return function(){
            let newLessonArray = [...data.lessons];
            newLessonArray.splice(index, 1);
            setData({...data, lessons: newLessonArray});
        }
    }
    const vadlidateData = async () => {
        let check = true;
        let newErr = {...err};
        
        if(data.name === ''){
          check &= false;
          newErr.name = true;
        }else{
          newErr.name = false;
        }
          
        if(data.code === '' || !regexCode.test(data.code)){
          check &= false;
          newErr.code = true;
        }else{
          await courseApi.checkCode(data.code)
            .then(resData => {
              //resData = false when code aldredy exist
              if(!resData){
                check &= false;
                newErr.code = true;
                setCodeErrString('Code already exist');
              }else{
                newErr.code = false;
                setCodeErrString('Code is require, use 5 characters or more for your code.');
              }
            })
        }
        if(data.lessons.length === 0){
            check &= false;
            newErr.lesson = true;
        }else{
            newErr.lesson = false;
        }
        setErr(newErr);
        return check;
      }
    const submit = async () => {
        const checkFlag = await vadlidateData();
        if(checkFlag){
          const rsAddCourseAction = await dispatch(addCourse(({...data, teacherId: id})));
          const rsData = unwrapResult(rsAddCourseAction);
          props.setCourses([...props.courses, rsData]);
          setSuccess(true);
        }else{
          setSuccess(false);
        }
    }
    useEffect(() => {
        document.getElementById('name').value = data.name;
        document.getElementById('code').value = data.code;
    },[])
        return(
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Edit course
                </Typography>
                <form className={classes.form} noValidate>
                <TextField
                    className={classes.spaceingAndWith}
                    variant="outlined"
                    margin="normal"
                    required
                    id="name"
                    label="Name course"
                    name="name"
                    autoComplete="Name course"
                    autoFocus
                    error={err.name}
                    onChange={getName}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="code"
                    label="Your code"
                    name="code"
                    autoComplete="Your code"
                    autoFocus
                    error={err.code}
                    onChange={getCode}
                />
                <Alert 
                    severity="error"
                    className={classnames({"hidden": !(err.name)})}
                >
                    Name  is require
                </Alert>
                <Alert
                    id="codeAlert"
                    severity="error"
                    className={classnames({"hidden": !(err.code)})}
                >
                    {codeErrString}
                </Alert>
                <TextField
                    className={classes.maxWidthInPut}
                    variant="outlined"
                    margin="normal"
                    required
                    id="lesson"
                    label="Lesson"
                    autoComplete="Lesson"
                    autoFocus
                    error={err.lesson}
                />  
                <Fab 
                    className={classes.marginTop} 
                    color="primary" 
                    aria-label="add"
                    onClick={getLesson}
                    >
                    <AddIcon />
                </Fab>
                <p>List lesson</p>
                <List>
                    {data.lessons.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item}/>
                            <IconButton onClick={deleteLesson(index)} edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
                <Alert 
                    severity="error"
                    className={classnames({"hidden": !(err.lesson)})}
                >
                    Lesson is require
                </Alert>
                <Button
                onClick={submit}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Add
                </Button>
            <Grid container>
                
            </Grid>
          <Alert 
            severity="success"
            className={classnames({"alertSuccess": true, "hidden": !success})}  
          >
            Course updated!
          </Alert>
        </form>
      </div>
    </Container>
    )
}
export default EditCourse;