import AppBar from '../components/AppBar.component';
import { 
  Container, TableContainer, Table, Paper,
  TableHead, TableRow, TableCell, TableBody, Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import groupApi from '../api/group.api';
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: theme.spacing(5),
      display: 'flex',
      justifyContent: 'center'
  },
  table: {
    minWidth: 650,
  },
  textColorRed: {
    color: 'red'
  },
  textColorGreen: {
    color: 'green'
  }
  
}));
export default function ListLessonPage() {
  const history = useHistory();
    if(localStorage.getItem('isTeacher') === 'false')
        history.push('/');
  const classes = useStyles();
  const idGroup = localStorage.getItem('idGroup');
  const [groupSelected, setGroupSelected] = useState({lessons: []});
  const startLesson = (lesson, index) => {
    return () => {
      localStorage.setItem('indexLesson', index)
      localStorage.setItem('lesson', lesson);
      history.push('/face-recognition');
    }
  }
  useEffect(() => {
    const fetch = async () => {
      const data = await groupApi.getById(idGroup);
      setGroupSelected(data);
    }
    fetch();
  }, [])
  return (
    <div style={{ height: 400, width: '100%' }}>
      <AppBar />
      <Container className={classes.root}>
        <TableContainer component={Paper} >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="center">Start</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          {groupSelected.lessons.map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell 
                align="right"
                className={item.isDone ? classes.textColorGreen : classes.textColorRed}
                >
                  {item.isDone ? 'true' : 'false'}
                </TableCell>
              <TableCell align="center">
                {!item.isDone ? 
                <Button onClick={startLesson(item.name, index)} variant="contained" color="primary">
                  Start
                </Button>  
                :
                <Button variant="contained" disabled>
                  Start
                </Button>
              }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
