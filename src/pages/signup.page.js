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
import { MicNone } from '@material-ui/icons';

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
  hiddenIuputImg: {
    display: 'none'
  },
  marginLeft: {
    margin: theme.spacing(2, 0, 2, 8)
  },
  mediumWidth: {
    minWidth: 150
  }
}));


export default function SignIn() {
  const classes = useStyles();
  const [position, setPosition] = React.useState('');
  const [open, setOpen] = React.useState(false);

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
    document.getElementById('inputImg').click();
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
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="usernmae"
            autoComplete="Username"
            autoFocus
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordconfirm"
            label="Confirm Password"
            type="password"
            id="passwordconfirm"
            autoComplete="current-password"
          />
        <InputLabel 
          className={classes.spaceingAndWith} 
          id="demo-controlled-open-select-label">
            Position
        </InputLabel>
        <Select
          
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={position}
          onChange={handleChange}
          className={classes.mediumWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'student'}>Student</MenuItem>
          <MenuItem value={'teacher'}>Teacher</MenuItem>
        </Select>

        <input 
          className={classes.hiddenIuputImg} 
          type="file" 
          accept="image/x-png,image/gif,image/jpeg"
          id="inputImg"
          />
        <Button
            onClick={handleInput}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.marginLeft}
          >
            Image
          </Button>
          <Button
            type="submit"
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