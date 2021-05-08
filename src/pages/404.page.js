import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './style/style.css';

import empty from './404-dribbble.gif';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default function SignIn() {
    const classes = useStyles();
  return (
    <Container className={classes.paper} component="main" maxWidth="xs">
         <img alt="404" className="errOnMobile" src={empty} />
    </Container>
  );
}