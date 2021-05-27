import AppBar from '../components/AppBar.component';
import { 
    Container, Table, TableHead, 
    TableRow, TableBody, TableCell,
    TableContainer, Paper, Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getClassById } from '../slices/class';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
    },
    textAlign: {
        textAlign: 'center'
    }
  }));
const FaceRecognitionPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchClassData = async () => {
            const classId = localStorage.getItem('idClass');
            const rsAction = await dispatch(getClassById(classId));
            const classData = unwrapResult(rsAction);
            setData(classData);

        }
        fetchClassData();
    }, [])
    return (
        <div>
            <AppBar />
            
            <Grid container className={classes.root} >
                <Grid item xs={6}>
                    <h1>image</h1>
                </Grid>
                <Grid item xs={6}>
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
                                <TableCell align="right">false</TableCell>
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
export default FaceRecognitionPage;