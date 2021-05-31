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
import { useDispatch } from 'react-redux';
import { getClassById } from '../slices/class';
import * as faceapi from 'face-api.js';
import Webcam from "react-webcam";
import {Image} from '@material-ui/icons/';
import './style/style2.css';
import groupApi from '../api/group.api';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
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
    containerLoading: {
        display: 'flex',
        justifyContent: 'center',
        width: '265px',
        marginTop: '31px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#3f51b5'
    },
    tempWebcam: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '1088px',
        height: '621px',
        backgroundColor: 'black'
    },
    input: {
        display: 'none'
    },
    icon: {
        fontSize: "5rem",
        color: 'white'
    },
    image: {
        maxHeight: '621px',
        maxWidth: "1088px"
    },
    divContainerImage: {
        position: 'relative'
    },
    endLessonButtonContainer: {
        paddingLeft: 'auto',
        margin: theme.spacing(5)
    }
  }));
const FaceRecognitionPage = () => {
    const history = useHistory();
    if(localStorage.getItem('isTeacher') === 'false')
        history.push('/');
    const idGroup = localStorage.getItem('idGroup');
    const indexLesson = localStorage.getItem('indexLesson');
    const classes = useStyles();
    const dispatch = useDispatch();
    const [labels, setLabels] = useState([]);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [start, setStart] = useState(false);
    const [data, setData] = useState([]);
    const [doneLesson, setDoneLesson] = useState(false)
    const [srcImage, setSrcImage] = useState(null);
    
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
      
    const webcamRef = useRef(null);
    
    const capture = useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        },
        [webcamRef]
    );
    const clickUploadImage = () => document.getElementById('imageUpload').click()
    
    function loadLabeledImages() {
        return Promise.all(
            labels.map(async label => {
                const descriptions = []
                for (let i = 0; i < 2; i++) {
                    const img = await faceapi.fetchImage(`img/${label}/${i}.jpg`)
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                    descriptions.push(detections.descriptor)
                }
                return new faceapi.LabeledFaceDescriptors(label, descriptions)
            })
            )
      }
    
    const endLesson = async () => {
        await groupApi.endLesson(idGroup, indexLesson);
        setDoneLesson(true);
    }
    const onDone = async () => {
        if(labels.length > 0){
            const imageUpload = document.getElementById('imageUpload')
            const container = document.getElementById('containerImage')
            const labeledFaceDescriptors = await loadLabeledImages()
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
            let image
            let canvas
            imageUpload.addEventListener('change', async (e) => {
                const file = e.target.files;
                if (image) image.remove()
                if (canvas) canvas.remove()
                image = await faceapi.bufferToImage(file[0])
                let reader = new FileReader();
                reader.onload = function (event) {
                    setSrcImage(event.target.result);
                };
                if(file[0]){
                reader.readAsDataURL(file[0]);
                }
                canvas = faceapi.createCanvasFromMedia(image)
                container.append(canvas)
                const displaySize = { width: image.width, height: image.height }
                faceapi.matchDimensions(canvas, displaySize)
                const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
                const resizedDetections = faceapi.resizeResults(detections, displaySize)
                const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
                results.forEach((result, i) => {
                    const box = resizedDetections[i].detection.box
                    const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                    drawBox.draw(canvas)  
                    })
            })  
        }
        setModelsLoaded(true)
    }
    useEffect(() => {
        const fetchClassData = async () => {
            const classId = localStorage.getItem('idClass');
            const rsAction = await dispatch(getClassById(classId));
            const classData = unwrapResult(rsAction);
            const lb = classData.map(item => item.code);
            const attendArr = classData.map(item => item)
            setLabels(lb);
            setData(classData);
        }
        fetchClassData();
        Promise.all([
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
          ]).then(onDone)
    }, [])
    return (
        <div>
            <AppBar />
            
            <Grid container className={classes.root} >
                <Grid item xs={8}>
                {start &&
                <Webcam
                    audio={false}
                    height={360}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={640}
                    videoConstraints={videoConstraints}
                />}
                {!start &&
                <div className={classes.tempWebcam}>
                    <div className={classes.divContainerImage} id="containerImage">
                        {srcImage  && <img id="idImage" className={classes.image} alt="image-recognition" src={srcImage} />}
                        {!srcImage &&<Image className={classes.icon} ></Image>}
                    </div>
                </div>
                
                }
                <Container className={classes.marginContainer}>
                    <Button 
                        className={classes.marginRightButton} 
                        variant="contained" color="primary" 
                        onClick={() => setStart(!start)}>
                            Start video
                    </Button>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="imageUpload"
                        multiple
                        type="file"
                    />
                    <label htmlFor="contained-button-file">
                        <Button onClick={clickUploadImage} variant="contained" color="primary" component="span">
                            Upload image
                        </Button>
                    </label>
                    {!modelsLoaded &&
                    <div>
                        <div className={classes.containerLoading}><CircularProgress/></div>
                        <div className={classes.containerLoading}>
                            Models loading...
                        </div>
                    </div>

                    }
                </Container>
                
                </Grid>
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
                                <TableCell align="right">false</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <div className={classes.endLessonButtonContainer}>
                        <Button onClick={endLesson} variant="contained" color="primary" component="span">
                            End lesson
                        </Button>
                    </div>
                    {doneLesson && <div className={classes.alertContainer}>End...</div>}
                </Grid>
            </Grid>
        </div>
    )
}
export default FaceRecognitionPage;