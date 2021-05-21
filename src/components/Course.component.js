import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {IconButton, Button} from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CardActions from '@material-ui/core/CardActions';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Delete, Edit } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCourse } from '../slices/course';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router';
// import { getByCourseId } from '../slices/group';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    cursor: 'pointer'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  }
}));

export default function Course(props) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userData);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteCourse = (id, index) => {
    return async function () {
      const rsDeleteCourseAction = await dispatch(deleteCourse({id, index}));
      const indexWantDelete = unwrapResult(rsDeleteCourseAction);
      props.updateArrayCourseAfterDelete(indexWantDelete);
    }
  };
  const getGroupsInCourse = (id) => {
    return async function () {
      localStorage.setItem('idCourse', id);
      history.push('/group');
    }
  }
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar 
          src={user.img}  
          aria-label="recipe" 
          className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton 
            aria-label="settings" 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={user.name}
        subheader={user.code}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={props.openEditCourseForm(props.course, props.index)}>
          <Edit />
          Edit 
        </MenuItem>
        <MenuItem onClick={handleDeleteCourse(props.course['_id'], props.index)}>
          <Delete />
          Delete
        </MenuItem>

      </Menu>
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.course.name} ({props.course.code})
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Number of lessons: {props.course.lessons.length}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={getGroupsInCourse(props.course['_id'])} size="small">View group</Button>
      </CardActions>
    </Card>
  );
}
