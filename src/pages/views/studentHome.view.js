import {  useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Group from '../../components/Group.component';
import { Container, Button } from '@material-ui/core';

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
    const groups  = useSelector(state => state.group.data) || [];
    const classes = useStyles();
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