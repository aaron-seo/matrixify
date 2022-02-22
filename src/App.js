import { Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TopTracks from './components/TopTracks';

let generateRandomString = (length) => {
    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

let getHashParams = () => {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e = r.exec(q);
    while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
    }
    return hashParams;
}


let App = (props) => {
    const [state, setState] = useState('');
    const [topTracks, setTopTracks] = useState();
    const [authd, setAuthd] = useState(false);
    const [accessToken, setAccessToken] = useState();
    const [expTimestamp, setExpTimestamp] = useState('');

    useEffect(() => {
        let params = getHashParams();
        setAccessToken(params.access_token);
    });

    let login = () => {
        const CLIENT_ID = 'f7df2a7171e64f4c821857bf2e948920';
        const REDIRECT_URI = 'http://localhost:3000/callback';

        const newState = generateRandomString(16);

        setState(newState);
        let scope = 'user-top-read';

        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(CLIENT_ID);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
        url += '&state=' + encodeURIComponent(state);
        url += '&show_dialog=true';

        window.open(url);
    }

	return (
		<div className='App'>
            <h1>matrixify</h1>
        { !accessToken ? (
            <button onClick={login}>Login</button>
        ) : (
            <TopTracks />
        )
        }
		</div>
	);

}
export default App;
