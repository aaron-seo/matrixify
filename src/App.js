import { Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TopTracks from './components/TopTracks';
import MatrixTerminal from './components/MatrixTerminal';
import './styles/index.css';

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
    const [state, setState] = useState();
    const [accessToken, setAccessToken] = useState();
    const [introDone, setIntroDone] = useState(false);

    const introText = ['Wake up, Neo.', 'The Matrix has you...', 'Follow the white rabbit...', 'Knock knock, Neo.'];

    useEffect(() => {
        setTimeout( () => {
            setIntroDone(true);
        }, 30000);

        let params = getHashParams();
        setAccessToken(params.access_token);
    });

    let login = () => {
        const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
        const REDIRECT_URI = 'https://matrixify.aaronseo.dev/';
        //const REDIRECT_URI = 'http://localhost:3000/callback';

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
        { !accessToken ? (
            <div>
                <MatrixTerminal text={introText} />
                { !introDone ? (
                    <p>test</p>
                ) : (
                    <a onClick={login}>(Insert white rabbit here)</a>
                )
                }
            </div>
        ) : (
            <TopTracks />
        )
        }
		</div>
	);

}
export default App;
