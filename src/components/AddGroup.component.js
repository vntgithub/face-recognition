import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {
    Avatar, Button, CssBaseline, TextField, IconButton,
    Grid, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem ,Container, FormGroup
  } from '@material-ui/core';
  
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

import '../pages/style/style.css';
import courseApi from '../api/course.api';
import { addGroup } from '../slices/group';
import { unwrapResult } from '@reduxjs/toolkit';
import groupApi from '../api/group.api';

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
      minWidth: 150
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
    },
    formControlSelect: {
      margin: theme.spacing(1),
      minWidth: 80,
    },
  
    inRow: {
      flexDirection: 'row'
    }
  }));
const AddGroup = (props) => {
    const {idCourse, setGroups, groups} = props;
    const teacher = useSelector(state => state.user.userData);
    const dispatch = useDispatch();
    const classes = useStyles();
    const getFristYear = () => {
      const d = new Date();
      return (d.getFullYear()-1).toString() + '-' + (d.getFullYear()).toString();
    }
    const getLastYear = () => {
      const d = new Date();
      return (d.getFullYear()).toString() + '-' + (d.getFullYear() + 1).toString();
    }
    const [success, setSuccess] = useState(false);
    const [semester, setSemester] = useState(1);
    const [errNoString, setNoErrString] = useState('Numberical order is require')
    const [data, setData] = useState({
      no: '',
      courseId: idCourse,
      teacherName: teacher.name,
      teacherCode: teacher.code,
      teacherImg: teacher.img,
      nameCourse: '',
      codeCourse: '',
      year: getFristYear(),
      semester: 1,
      classId: '',
      numberOfStudent: '',
      isDone: false
    })
    const [err, setErr] = React.useState({numberOfStudent: false, no: false});
    const handleChangeYear = (e) => setData({...data, year: e.target.value});
    const getNumberOfStudent = (e) => setData({...data, numberOfStudent: parseInt(e.target.value)});
    const getNo = (e) => setData({...data, no: parseInt(e.target.value)});
    const vadlidateData = async () => {
        let check = true;
        let newErr = {...err};
        if(data.numberOfStudent === '' || data.numberOfStudent < 0){
          check &= false;
          newErr.numberOfStudent = true;
        }else{
          newErr.numberOfStudent = false;
        }
          
        if(data.no === '' || data.no < 0){
          check &= false;
          newErr.no = true;
        }else{
          await groupApi.checkNo({
            no:data.no, 
            semester: data.semester, 
            year: data.year
          })
            .then(resData => {
              //resData = false when code aldredy exist
              if(!resData){
                check &= false;
                newErr.no = true;
                setNoErrString('Numberical order already exist');
              }else{
                newErr.no = false;
                setNoErrString('Numberical order is require and greater than 0');
              }
            })
        }
        setErr(newErr);
        return check;
      }
    const handleChangeSemester = (e) => {
      setSemester(e.target.value);
      setData({...data, semester: e.target.value});
    }
    const submit = async () => {
        const checkFlag = await vadlidateData();
        if(checkFlag){
          // const rsAddCourseAction = await dispatch(addCourse(({...data, teacherId: id})));
          const rsAddGroupAction = await dispatch(addGroup(data))
          const rsData = unwrapResult(rsAddGroupAction);
          setGroups([...groups, rsData]);
          setSuccess(true);
        }else{
          setSuccess(false);
        }
    }
    useEffect(() => {
      const fetchCourseOfGroupData = async () => {
        const courseOfGroup = await courseApi.getById(idCourse);
        setData({
          ...data,
          nameCourse: courseOfGroup.name,
          codeCourse: courseOfGroup.code
        })
      }
      fetchCourseOfGroupData();
    }, [])
        return(
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Add group
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                      className={classes.spaceingAndWith}
                      variant="outlined"
                      margin="normal"
                      required
                      id="no"
                      label="Numerical order"
                      autoComplete="Numerical order"
                      autoFocus
                      error={err.no}
                      onChange={getNo}
                      type="number"
                  />
                  <TextField
                      className={classes.spaceingAndWith}
                      variant="outlined"
                      margin="normal"
                      required
                      id="numberofstudent"
                      label="Numer of student"
                      autoComplete="Numer of student"
                      autoFocus
                      error={err.numberOfStudent}
                      onChange={getNumberOfStudent}
                      type="number"
                  />
                  <Alert 
                    severity="error"
                    className={classnames({"hidden": !(err.no)})}
                  >
                    {errNoString}
                  </Alert>
                  <Alert 
                    severity="error"
                    className={classnames({"hidden": !(err.numberOfStudent)})}
                  >
                    Number of student  is require and greater than 0
                  </Alert>
                      <InputLabel className={classes.marginTop} id="demo-simple-select-label">Semester</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={semester}
                        onChange={handleChangeSemester}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </Select>
                      <InputLabel className={classes.marginTop} id="demo-simple-radio-label">Year</InputLabel>
                      <RadioGroup 
                        labelId="demo-simple-radio-label" 
                        className={classes.childInline} name="year" 
                        value={data.year} onChange={handleChangeYear}>
                        <FormControlLabel  value={getFristYear()} control={<Radio />} label={getFristYear()} />
                        <FormControlLabel  value={getLastYear()} control={<Radio />} label={getLastYear()} />
                      </RadioGroup>
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