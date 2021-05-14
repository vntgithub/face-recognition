import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Group from '../components/Group.component';
import { Container, Button } from '@material-ui/core';
import AppBar from '../components/AppBar.component';
import AddGroup from '../components/AddGroup.component';
import { unwrapResult } from '@reduxjs/toolkit';
import { getByCourseId } from '../slices/group'
const useStyles = makeStyles((theme) => ({
    divGroup: {
        margin: theme.spacing(3),
        display: 'inline-table'
    },
    divAddButton: {
        margin: theme.spacing(3),
        maxWidth: 345
    }
  }));
const GroupPage = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const groupsInStore = useSelector(state => state.group.data)
    const [groups, setGroups] = useState(groupsInStore);
    const [openAddGroup, setOpenAddGroup] = useState(false);
    const [openEditGroup, setOpenEditGroup] = useState(false);
    useEffect(() => {
        const getGroup = async () => {
            const id = window.location.pathname.substr(7);
            const rsAction = await dispatch(getByCourseId(id));
            setGroups(unwrapResult(rsAction));
        } 
        getGroup();
    }, [])
    const backAddForm = () => setOpenAddGroup(false);
    return (
        <div>
            <AppBar />
            {openAddGroup && 
                <AddGroup
                    backAddForm={backAddForm} 
                    setCourses={setGroups} 
                    groups={groups} />}
            {!openAddGroup && !openEditGroup &&
                <Container>
                 <div className={classes.divAddButton}>
                    <Button onClick={() => setOpenAddGroup(true)} variant="contained">Add group</Button>
                </div>
                {groups.map((item, index) => 
                    <div className={classes.divGroup}>
                        <Group key={index} group={item} />
                    </div>
                )}
            </Container>}
        </div>
    )
}

export default GroupPage;