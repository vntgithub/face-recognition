import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Group from '../components/Group.component';
import { Container, Button } from '@material-ui/core';
import AppBar from '../components/AppBar.component';
import AddGroup from '../components/AddGroup.component';
import EditGroup from '../components/EditGroup.component';
import { unwrapResult } from '@reduxjs/toolkit';
import { getByCourseId } from '../slices/group'
import { useHistory } from 'react-router';
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
const GroupPage = () => {
    const history = useHistory();
    if(localStorage.getItem('isTeacher') === 'false')
        history.push('/');
    const dispatch = useDispatch();
    const classes = useStyles();
    const [id, setId] = useState(0);
    const groupsInStore = useSelector(state => state.group.data)
    const [groups, setGroups] = useState(groupsInStore);
    const [indexWantEdit, setIndexWantEdit] = useState(-1);
    const [openAddGroup, setOpenAddGroup] = useState(false);
    const [openEditGroup, setOpenEditGroup] = useState(false);
    useEffect(() => {
        const getGroup = async () => {
            const idInLocalStr = localStorage.getItem('idCourse');
            setId(idInLocalStr);
            const rsAction = await dispatch(getByCourseId(idInLocalStr));
            setGroups(unwrapResult(rsAction));
        } 
        getGroup();
    }, [])
    const backAddForm = () => setOpenAddGroup(false);
    const updateGroupsAfterDelete = (index) => {
        let newGroups = [...groups];
        newGroups.splice(index, 1);
        setGroups(newGroups);
    }
    const updateGroupsAfterEdit = (groupNeedEdit, index) => {
        let newGroups = [...groups];
        newGroups.splice(index, 1, groupNeedEdit);
        setGroups(newGroups);
    }
    const backEditForm = () => setOpenEditGroup(false);
    return (
        <div>
            <AppBar />
            {openAddGroup && 
                <AddGroup
                    idCourse={id}
                    backAddForm={backAddForm} 
                    setGroups={setGroups} 
                    groups={groups} />}
            {openEditGroup && 
                <EditGroup 
                    group={groups[indexWantEdit]}
                    updateGroupsAfterEdit={updateGroupsAfterEdit}
                    index={indexWantEdit}
                    backEditForm={backEditForm}
                />
            }
            {!openAddGroup && !openEditGroup &&
                <Container>
                 <div className={classes.divAddButton}>
                    <Button onClick={() => setOpenAddGroup(true)} variant="contained">Add group</Button>
                </div>
                {groups.map((item, index) => 
                    <div key={index} className={classes.divGroup}>
                        <Group 
                            setOpenEditGroup={setOpenEditGroup}
                            setIndexWantEdit={setIndexWantEdit}
                            index={index}
                            group={item} 
                            updateGroupsAfterDelete={updateGroupsAfterDelete}
                            />
                    </div>
                )}
            </Container>}
        </div>
    )
}

export default GroupPage;