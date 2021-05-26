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
    const { groups } = props;
    const groupsOfStudent = useSelector(state => state.group.data);
    const classes = useStyles();
    const checkJoined = (item) => {
        for(let i = 0; i < groupsOfStudent.length; i++){
          if(item['_id'] === groupsOfStudent[i]['_id']){
            return true
          }
        }
        return false;
      }
    return (
        <div>
            <Container>
                 
                {groups.map((item, index) => 
                    <div key={index} className={classes.divGroup}>
                        <Group 
                            checkOfStudent={checkJoined(item)}
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