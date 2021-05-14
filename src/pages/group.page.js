import { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Group from '../components/Group.component';
import { Container, Button } from '@material-ui/core';
import AppBar from '../components/AppBar.component';
import AddGroup from '../components/AddGroup.component';
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
    const classes = useStyles();
    const groupsInStore = useSelector(state => state.group.data)
    const [groups, setGroups] = useState(groupsInStore);
    const [openAddGroup, setOpenAddGroup] = useState(false);
    const [openEditGroup, setOpenEditGroup] = useState(false);
    
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