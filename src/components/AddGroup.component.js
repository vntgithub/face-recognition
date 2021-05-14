import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {
    Avatar, Button, CssBaseline, TextField, IconButton,
    Grid, Fab, Container
  } from '@material-ui/core';
  
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
      margin: theme.spacing(3, 6, 2),
      width: 300
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
    },
    back: {
      margin: theme.spacing(3, 0, 2),
    }
  }));
const AddGroup = (props) => {
    const id = useSelector(state => state.user.userData['_id']);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [success, setSuccess] = useState(false);
    const [codeErrString, setCodeErrString] = useState('Code is require, use 5 characters or more for your code.');
    const [data, setData] = useState({
        name: '',
        code: '',
        lessons: [],
        teacherId: id,
    })
    const [err, setErr] = React.useState({
        name: false,
        code: false,
        lesson: false
      });
    const regexCode = /^[a-zA-Z0-9]{5,}$/;
    const getName = (e) => setData({...data, name: e.target.value});
    const getCode = (e) => setData({...data, code: e.target.value});
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
        return(
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Add course
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
                <Button
                onClick={submit}
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Add
                </Button>
                <Button 
                    className={classes.back} 
                    variant="contained"
                    onClick={props.backAddForm}
                    >
                        Back
                </Button>
            <Grid container>
                
            </Grid>
          <Alert 
            severity="success"
            className={classnames({"alertSuccess": true, "hidden": !success})}  
          >
            Group added!
          </Alert>
        </form>
      </div>
    </Container>
    )
}
export default AddGroup;