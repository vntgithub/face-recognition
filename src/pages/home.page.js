import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import {loginByToken} from '../slices/user';

import AppBar from '../components/AppBar.component';
import { unwrapResult } from '@reduxjs/toolkit';

const Home = () => {
    const [srcImg, setSrcImg] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    useEffect(() => {
        const checkTokenAndSignIn =  async () => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if(token){
                const rsAction = await dispatch(loginByToken(token));
                const data = unwrapResult(rsAction);
                setUser(data);
                setSrcImg(data.img);
    
            }else{
                history.push('/signin');
            }
        }
        checkTokenAndSignIn();
    },[]);
    return(
        <AppBar srcImg={srcImg} nameUser={user.name} />
    )
}

export default Home;