import AppBar from '../components/AppBar.component';
import { 
    Button, Table, TableHead, 
    TableRow, TableBody, TableCell,
    TableContainer, Paper, Grid, Container,
    CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { getClassById } from '../slices/class';
import * as faceapi from 'face-api.js';
import { Image, Check, Close } from '@material-ui/icons/';
import './style/style2.css';
import groupApi from '../api/group.api';
import classApi from '../api/class.api';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
        display: 'flex',
        justifyContent: 'center'
    },
    textAlign: {
        textAlign: 'center'
    },
    marginContainer: {
        margin: theme.spacing(7)
    },
     marginRightButton: {
        marginRight: theme.spacing(3)
    },
    
    icon: {
        fontSize: "5rem",
        color: 'white'
    },
    
  }));
const HistoryRecognitionPage = () => {
    const history = useHistory();
    if(localStorage.getItem('isTeacher') === 'false')
        history.push('/');
    const indexLesson = localStorage.getItem('indexLesson');
    const classId = localStorage.getItem('idClass');
    const idGroup = localStorage.getItem('idGroup');
    const classes = useStyles();
    const dispatch = useDispatch();
    const [attendList, setAttendList] = useState([]);
    const [data, setData] = useState([]);
    
    const getIcon = (b) => {
        if(b)
            return <Check style={{ color: 'green' }} />
        return <Close color="secondary" />
    }
    useEffect(() => {
        const fetchClassData = async () => {
           const getClassAction =  await dispatch(getClassById(classId));
           const dataRs = unwrapResult(getClassAction)
           const attenListData = dataRs.attendList.map(item => item[indexLesson])
           setAttendList(attenListData)
           setData(dataRs.data);
        }
        fetchClassData();
    }, [])

   
    return (
        <div>
            <AppBar />
            
            <Grid container className={classes.root} >
                <Grid item xs={4}>
                <h2 className={classes.textAlign}>{localStorage.getItem('lesson')}</h2>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Code</TableCell>
                            <TableCell align="right">Attend</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={row.name}>
                                <TableCell key={index} component="th" scope="row">
                                    {index}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.code}</TableCell>
                                <TableCell align="right">{getIcon(attendList[index])}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
            </Grid>
        </div>
    )
}
export default HistoryRecognitionPage;