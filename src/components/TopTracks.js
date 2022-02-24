import React, { useState, useEffect }from 'react';
//import MatrixTerminal from './MatrixTerminal';

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

let TopTracks = () => {
    const [topTracks, setTopTracks] = useState();
    const [tracksText, setTracksText] = useState([]);

    useEffect( () => {
        let token = getHashParams().access_token;
        fetch('https://api.spotify.com/v1/me/top/tracks', {
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }).then( (response) => {
            return response.json();
        }).then( (data) => {
            console.log(data.items);
            setTopTracks(data.items);
            console.log(topTracks);

            /*
            for (let track in data.items) {
                setTracksText(tracksText + track.name);
            }
            */

        });
    }, []);

    /*
    return (
        <div className='TopTracks'>
            <h2>Top Tracks</h2>
            { topTracks ? (
                <MatrixTerminal text={'test'} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
    */
    return (
        <div className='TopTracks'>
            <h2>Top Tracks</h2>
            { topTracks ? (
                <div>
                    { topTracks.map( track => 
                        <div> {track.name} - {track.artists[0].name}</div>
                    
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default TopTracks;
