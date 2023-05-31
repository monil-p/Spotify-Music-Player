import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node'
import TrackResult from './TrackResult'
import Player from './Player'

const spotify = new SpotifyWebApi({
    ClientId: INSERT HERE,
    ClientSecret: INSERT HERE
})

const clientId = INSERT HERE;
const clientSecret = INSERT HERE;

console.log('Client ID:', clientId);
console.log('Client Secret:', clientSecret);

function Dashboard(){

    const [accessToken, setAccessToken] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    // console.log(searchResults)

    function chooseTrack(track){
        setPlayingTrack(track)
        searchInput('')
    }

    useEffect(() => {

        let auth = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret
        }

        fetch('https://accounts.spotify.com/api/token', auth).then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, [])


    useEffect(() => {
        if(!accessToken){
            return
        }

        spotify.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if(!searchInput){
            return setSearchResults([])
        }

        let cancel = false;

        spotify.searchTracks(searchInput).then(results => {
            if(cancel){
                return
            }

            setSearchResults(results.body.tracks.items.map(track => {
                const smallestImage = track.album.images.reduce(
                    (smallest, image) => {
                        if(image < smallest){
                            return image
                        } else{
                            return smallest
                        }
                    }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestImage.url
                }
            }))
        })

        return () => cancel = true
    }, [searchInput])

    return (
        <Container className='d-flex flex-column py-2' style={{height: '100vh'}}>
            <Form.Control 
                type='search'
                placeholder='Search For Song'
                value={searchInput}
                onChange={event => setSearchInput(event.target.value)}
            />

            <div className='flex-grow-1 my-2' style={{overflowY: 'auto'}}>
                {searchResults.map(track => (
                    <TrackResult track={track} key={track.uri} chooseTrack={chooseTrack} />
                ))}
            </div>

            <div>
                <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
            </div>
        </Container>
    )
}

export default Dashboard;
