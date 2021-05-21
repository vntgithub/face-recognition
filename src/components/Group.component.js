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
import { CardActions, Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Delete, Edit } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { deleteGroup } from '../slices/group';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    maxWidth: 250
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
  const history = useHistory();
  const { 
      group, 
      updateGroupsAfterDelete, 
      index,
      setIndexWantEdit,
      setOpenEditGroup
    } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteGroup = (id, index) => {
    return async function () {
      await dispatch(deleteGroup({id, index}));
      updateGroupsAfterDelete(index);
    }
  };
  const handleEditGroup = (index) => {
    return function () {
      setIndexWantEdit(index);
      setOpenEditGroup(true);
    }
  };
  
  const getStateGroup = () => {
    if(group.isDone)
      return 'finished';
    return 'unfinished'
  }
  const viewListLesson = () => {
    history.push('/group/lesson');
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
        <MenuItem onClick={handleEditGroup(index)}>
          <Edit />
          Edit 
        </MenuItem>
        <MenuItem onClick={handleDeleteGroup(group['_id'], index)}>
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
          Semesber: {group.semester}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Number of student: {group.numberOfStudent}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          State: {getStateGroup()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={viewListLesson} size="small">View list lesson</Button>
      </CardActions>
    </Card>
  );
}
