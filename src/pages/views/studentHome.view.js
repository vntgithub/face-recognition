import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Group from '../../components/Group.component';
import { Container, Button } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { getGroupByStudentId } from '../../slices/group'
const useStyles = makeStyles((theme) => ({
    divGroup: {
        margin: theme.spacing(3),
        display: 'inline-table'
    },
    divAddButton: {
        margin: theme.spacing(4,5),
        maxWidth: 345
    }
  }));
const StudentHomeView = (props) => {
    const dispatch = useDispatch();
    const { groups, setGroups } = props;
    const classes = useStyles();
    const user = useSelector(state => state.user.userData);
    const groupsInStore = useSelector(state => state.group.data)
    
    useEffect(() => {
        const getGroup = async () => {
            const studentId = user['_id'];
            const rsAction = await dispatch(getGroupByStudentId(studentId));
            setGroups(unwrapResult(rsAction));
        } 
        getGroup();
    }, [])

    return (
        <div>
            <Container>
                 
                {groups.map((item, index) => 
                    <div key={index} className={classes.divGroup}>
                        <Group 
                            index={index}
                            group={item} 
                            />
                    </div>
                )}
            </Container>
        </div>
    )
}

export default StudentHomeView;