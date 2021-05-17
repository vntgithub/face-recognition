import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Delete, Edit } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCourse } from '../slices/course';
import { unwrapResult } from '@reduxjs/toolkit';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    maxWidth: 250,
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
  },
}));

export default function Group(props) {
  const { group } = props;
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
  const getStateGroup = () => {
    if(group.isDone)
      return 'finished';
    return 'unfinished'
  }
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar 
          src={group.teacherImg}  
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
        title={group.teacherName}
        subheader={group.teacherCode}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => console.log("Edit")}>
          <Edit />
          Edit 
        </MenuItem>
        <MenuItem onClick={() => console.log("Edit")}>
          <Delete />
          Delete
        </MenuItem>

      </Menu>
      
      <CardContent>

        <Typography variant="body2" color="textSecondary" component="p">
          {group.nameCourse} ({group.codeCourse})
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Numberical order: {group.no}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Year: {group.year}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Semesber: {group.semesber}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          State: {getStateGroup()}
        </Typography>
      </CardContent>
    </Card>
  );
}
