import React from 'react';
import classnames from 'classnames';
import {
  Avatar, Button, CssBaseline, TextField,
  Link, Grid, Box, Container, RadioGroup, FormControlLabel, Radio
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import userApi from '../api/user.api';

import './style/style.css';
import { useHistory } from 'react-router';





function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/vntgithub">
        Vo Nhat Trieu
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  
}));


export default function SignIn() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const history = useHistory();
  if(token)
    history.push('/');
  const classes = useStyles();
  const [success, setSuccess] = React.useState(false);
  const [position, setPosition] = React.useState('student');
  const [dataForm, setDataForm] = React.useState({
    username: '',
    password: '',
    passwordConfirm: '',
    name: '',
    code: '',
    img: '',
    isTeacher: false
  });
  const [file, setFile] = React.useState(null);
  const [srcImage, setSrcImage] = React.useState('');
  const [err, setErr] = React.useState({
    name: false,
    code: false,
    username: false,
    password: false,
    passwordConfirm: false,
    position: false,
    image: false
  });
  const regexCode = /^[a-zA-Z0-9]{5,}$/;
  const regexPassword = /[a-zA-z0-9]{8}/;

  const handleChange = (event) => {
    setPosition(event.target.value); 
    setDataForm({...dataForm, isTeacher: event.target.value ==='teacher'});
  };
  const getName = (event) => setDataForm({...dataForm, name: event.target.value});
  const getCode = (event) => setDataForm({...dataForm, code: event.target.value});
  const getUsername = (event) => setDataForm({...dataForm, username: event.target.value});
  const getPassword = (event) => setDataForm({...dataForm, password: event.target.value});
  const getPasswordConfirm = (event) => setDataForm({...dataForm, passwordConfirm: event.target.value});
  const handleInput = () => document.getElementById('image').click();

  const getImage = (e) => {
    const file = e.target.files;
    setFile(file);
 
    let reader = new FileReader();
    reader.onload = function (e) {
            setSrcImage(e.target.result);
        };

    if(file[0]){
      reader.readAsDataURL(file[0]);
    }
}
  const vadlidateData = async () => {
    let check = true;
    let newErr = {...err};
    
    if(dataForm.name === ''){
      check &= false;
      newErr.name = true;
    }else{
      newErr.name = false;
    }
      
    if(dataForm.code === '' || !regexCode.test(dataForm.code)){
      check &= false;
      newErr.code = true;
    }else{
      await userApi.checkCode(dataForm.code)
        .then(resData => {
          //resData = false when code aldredy exist
          if(!resData){
            check &= false;
            newErr.code = true;
            document.getElementById('codeAlert').innerHTML = 'Code already exist';
          }else{
            newErr.code = false;
            document.getElementById('codeAlert').innerHTML = 'Code is require, use 5 characters or more for your code.';
          }
        })
    }
    if(dataForm.username === '' || !regexPassword.test(dataForm.username)){
      check &= false;
      newErr.username = true;
    }else{
      await userApi.checkUsername(dataForm.username)
      .then(resData => {
        if(!resData){
          check &= false;
          newErr.username = true;
          document.getElementById('usernameAlert').innerHTML = 'Username already exist';
        }else{
          newErr.username = false;
          document.getElementById('usernameAlert').innerHTML = 'Username is require, use 8 characters or more for your username';
        }
      })
    }
    
    if(dataForm.password === '' || !regexPassword.test(dataForm.password)){
      check &= false;
      newErr.password = true;
    }else{
      newErr.password = false;
    }
    if(dataForm.passwordConfirm === '' || dataForm.password !== dataForm.passwordConfirm){
      check &= false;
      newErr.passwordConfirm = true;
    }else{
      newErr.passwordConfirm = false;
    }
    if(position === ''){
      check &= false;
      newErr.position = true;
    }else{
      newErr.position = false;
    }
    if(!file){
      check &= false;
      newErr.image = true
    }else{
      newErr.image = false;
    }
    
    setErr(newErr);
    return check;
  }
  const submit = () => {
    vadlidateData().then(async (check) => {
      if(check){
        let data = {...dataForm};
        delete data.passwordConfirm;
        let form = new FormData();
        form.append('image', file[0]);
        for(let key in data){
          form.append(key, dataForm[key]);
        }
        await userApi.add(form)
          .then(resData => console.log(resData))
          .catch(err => console.log(err))
        setSuccess(true);

      }
    })
    .catch(err => console.log(err));
    
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
            className={classes.spaceingAndWith}
            variant="outlined"
            margin="normal"
            required
            id="name"
            label="Your name"
            name="name"
            autoComplete="Your name"
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
            Code is require, use 5 characters or more for your code.
          </Alert>
          <TextField
            error="true"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="usernmae"
            autoComplete="Username"
            autoFocus
            error={err.username}
            onChange={getUsername}
          />
          <Alert 
            id="usernameAlert"
            severity="error"
            className={classnames({"hidden": !err.username})}
          >
            Username is require, use 8 characters or more for your username
          </Alert>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={err.password}
            onChange={getPassword}
          />
          <Alert 
            severity="error"
            className={classnames({"hidden": !err.password})}  
          >
            Password is require, use 8 characters or more for your password
          </Alert>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordconfirm"
            label="Confirm Password"
            type="password"
            id="passwordConfirm"
            autoComplete="current-password"
            error={err.passwordConfirm}
            onChange={getPasswordConfirm}
          />
          <Alert 
            id="passwordConfirm"
            severity="error"
            className={classnames({"hidden": !err.passwordConfirm})}  
          >
            Those passwords didn’t match. Try again.
          </Alert>
          <RadioGroup className={classes.childInline}  name="position" value={position} onChange={handleChange}>
              <FormControlLabel  value="student" control={<Radio />} label="Student" />
              <FormControlLabel  value="teacher" control={<Radio />} label="Teacher" />
          </RadioGroup>

        <input 
          className="hidden" 
          type="file" 
          accept="image/x-png,image/gif,image/jpeg"
          id="image"
          onChange={getImage}
          />
        <Button
            onClick={handleInput}
            variant="contained"
            color="primary"
            className={classes.marginLeft}
          >
            Image
          </Button>
          <Avatar 
            alt="Avatar" 
            src={srcImage}
            className="reviewImg"
          />
          <Alert 
            severity="error" 
            className={classnames({"hidden": !err.image})}
          >
            Image is require
          </Alert>
          <Button
            onClick={submit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signin" variant="body2">
                {"Sign In"}
              </Link>
            </Grid>
          </Grid>
          <Alert 
            severity="success"
            className={classnames({"alertSuccess": true, "hidden": !success})}  
          >
            You have signed up successfully!
          </Alert>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}