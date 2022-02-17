import React, { useState, useEffect } from 'react';

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
    const [topTracks, setTopTracks] = useState({});
    const [authd, setAuthd] = useState(false);

    useEffect(() => {
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

        let popup = window.open(url);

        window.spotifyCallback = (payload) => {
            popup.close();

            fetch('https://api.spotify.com/v1/me/top/tracks', {
                headers: {
                    'Authorization': 'Bearer ' + payload
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                setTopTracks(data);
            });
        }
    }

    return (
        <div className='App'>
            <button onClick={() => login()}>Login</button>
        </div>
    );
}
export default App;
