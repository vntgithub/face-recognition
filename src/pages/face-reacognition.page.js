import AppBar from '../components/AppBar.component';
import { 
    Container, Table, TableHead, 
    TableRow, TableBody, TableCell,
    TableContainer, Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getClassById } from '../slices/class';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
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
            <Container className={classes.root} maxWidth='xl'>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Code</TableCell>
                        <TableCell align="right">Attend</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={row.name}>
                            <TableCell key={index} component="th" scope="row">
                                {index}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.code}</TableCell>
                            <TableCell align="right">false</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Container>
        </div>
    )
}
export default FaceRecognitionPage;