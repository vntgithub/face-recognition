import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/user';
import { unwrapResult } from '@reduxjs/toolkit';

import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox,
  Link, Grid, Box, Radio, RadioGroup, Typography, Container
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';



import './style/style.css';
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
  childInline: {
    flexDirection: 'row'
  }
}));

export default function SignIn() {
  const [data, setData] = useState({
    username: '',
    password: ''
  })
  const [err, setErr] = useState(false);
  const [position, setPosition] = useState('student');
  const [rememberme, setRememberme] = useState(true);
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleChange = (event) => {
    setPosition(event.target.value);
  };
  const handleChangeRememberMe = () => {
    setRememberme(!rememberme);
  }
  const getUsername = (event) => setData({...data, username: event.target.value});
  const getPassword = (event) => setData({...data, password: event.target.value});
  const validata = () => {
    let check = true;
    if(data.username === ''){
      check &= false;
      setErr(true);
    }else{
      setErr(false);
    }
    if(data.password === ''){
      check &= false;
      setErr(true);
    }else{
      setErr(false);
    }
    return check;
  }
  const handleLogin = async() => {
    const check = validata();
    if(check){
      const loginActionResult = await dispatch(login({data, position}));
      const userData = unwrapResult(loginActionResult);
      if(userData.token){
        localStorage.setItem('token', userData.token);
        setErr(false);
      }else{
        setErr(true);
      }
    }else{
      console.log('something wrong!');
    }
    //axiosClient.defaults.headers.common['Authorization'] = userData.token;
    // history.push('/hone')
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form id="loginForm" className={classes.form} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="email"
            autoComplete="username"
            autoFocus
            onChange={getUsername}
          />
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
            onChange={getPassword}
          />
          <RadioGroup className={classes.childInline}  name="position" value={position} onChange={handleChange}>
              <FormControlLabel  value="student" control={<Radio />} label="Student" />
              <FormControlLabel  value="teacher" control={<Radio />} label="Teacher" />
          </RadioGroup>
          <FormControlLabel
            control={
            <Checkbox 
              onChange={handleChangeRememberMe} 
              checked={rememberme}  
              value="remember" 
              color="primary" />}
            label="Remember me"
          />
          {err && <Alert 
              severity="error"
            >
              Username or password is wrong
            </Alert>
          }
          <Button
            onClick={handleLogin}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}