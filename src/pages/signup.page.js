import React from 'react';
import classnames from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

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
  const classes = useStyles();
  const [position, setPosition] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState(null);
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
  const regexCode = /^[a-z]{2}\d{3,}$/;
  const regexPassword = /[a-zA-z0-9]{8}/;

  const handleChange = (event) => {
    setPosition(event.target.value);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleInput = () => {
    document.getElementById('image').click();
  }
  const getImage = (e) => {
    const file = e.target.files;
    const imageData  = new FormData();
    imageData.append('file', file[0]);
    imageData.append('upload_preset', 'usersimage');
    setImage(imageData);
    //Review
    let reader = new FileReader();
    reader.onload = function (e) {
            setSrcImage(e.target.result);
        };

    reader.readAsDataURL(file[0]);
}
  const vadlidateData = () => {
    let check = true;
    let newErr = {...err};
    const name = document.getElementById('name').value;
    const code =document.getElementById('code').value;
    const username =document.getElementById('username').value;
    const password =document.getElementById('password').value;
    const passwordConfirm =document.getElementById('passwordConfirm').value;
    if(name === ''){
      check &= false;
      newErr.name = true;
    }else{
      newErr.name = false;
    }
      
    if(code === '' || !regexCode.test(code)){
      check &= false;
      newErr.code = true;
    }else{
      newErr.code = false;

    }
    if(username === '' || !regexPassword.test(username)){
      check &= false;
      newErr.username = true;
    }else{
      newErr.username = false;
    }
    if(password === '' || !regexPassword.test(password)){
      check &= false;
      newErr.password = true;
    }else{
      newErr.password = false;
    }
    if(passwordConfirm === '' || password !== passwordConfirm){
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
    if(!image){
      check &= false;
      newErr.image = true
    }else{
      newErr.image = false;
    }

    setErr(newErr);
    return check;
  }
  const submit = async() => {
    console.log('check: ', vadlidateData());
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
          />
          <Alert 
            severity="error"
            className={classnames({"hidden": !(err.name || err.code)})}
          >
            Name and code is require, use 5 characters or more for your code. Example for code: ct123
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
          />
          <Alert 
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
          />
          <Alert 
            id="passwordConfirm"
            severity="error"
            className={classnames({"hidden": !err.passwordConfirm})}  
          >
            Those passwords didn’t match. Try again.
          </Alert>
        <InputLabel 
          className={classes.spaceingAndWith} 
          id="demo-controlled-open-select-label"
          >
            Position
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="position"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={position}
          onChange={handleChange}
          className={classes.mediumWidth}
          error={err.position}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'student'}>Student</MenuItem>
          <MenuItem value={'teacher'}>Teacher</MenuItem>
        </Select>

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
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}