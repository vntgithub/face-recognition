import AppBar from '../components/AppBar.component';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
    }
  }));
const FaceRecognitionPage = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar />
            <Container className={classes.root} maxWidth='xl'>
                asfuhaskfh
                asfhgsajhfashfg
            </Container>
        </div>
    )
}
export default FaceRecognitionPage;