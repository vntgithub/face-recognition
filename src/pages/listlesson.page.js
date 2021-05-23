import AppBar from '../components/AppBar.component';
import { 
  Container, TableContainer, Table, Paper,
  TableHead, TableRow, TableCell, TableBody
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import groupApi from '../api/group.api';


const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: theme.spacing(5),
      display: 'flex',
      justifyContent: 'center'
  },
  table: {
    minWidth: 650,
  },
  
}));
export default function ListLessonPage() {
  const classes = useStyles();
  const idGroup = localStorage.getItem('idGroup');
  const [groupSelected, setGroupSelected] = useState({lessons: []});
  useEffect(() => {
    const fetch = async () => {
      const data = await groupApi.getById(idGroup);
      console.log(data);
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
                <TableCell align="right">Start</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          {groupSelected.lessons.map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.isDone ? 'true' : 'false'}</TableCell>
              <TableCell align="right">Button</TableCell>
            </TableRow>
          ))}
        </TableBody>
          </Table>
        </TableContainer>
        {/* <List component="nav" aria-label="main mailbox folders">
            {groupSelected.lessons.map((item, index) => 
              <ListItem key={index}>{item.name}</ListItem>
            )}
        </List> */}
      </Container>
    </div>
  );
}
