import React from 'react';
import Api from '../Api';
import './Login.css';

function Login({onReceive}) {
    const handleGoogleLogin = async () => {
        let result = await Api.ggPopup();
        if (result) {
            onReceive(result.user);
        } else {
            alert("Error!");
        }
    }

    return (
        <div className='login'>
            <button onClick={handleGoogleLogin}>Login from Google</button>
        </div>
    )
}

export default Login;
