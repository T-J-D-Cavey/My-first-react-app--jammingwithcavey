// import App from "../Components/App/App";

let accessToken; 
// I will hide the clientID for the github respository for security reasons. This will stop the app functioning
const clientID = "2711362ce6bc4295a166696328b5f946";
const redirectUri = "http://jammingwithcavey.surge.sh";

let Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        } 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            // below, not sure why we used [1] and not [0]. worth testing with [0]?
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
            } 
            else {
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
                window.location = accessUrl;
            }
        
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(
        `https://api.spotify.com/v1/search?type=track&q=${term}`, 
        { headers: {
            Authorization: `Bearer ${accessToken}`}
        }).then((response) => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            } 
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
        })) 
        });
    },

    savePlaylist(playlistName, trackUris) {
        // GET request to save
        if (!playlistName || !trackUris.length) {
            return
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        let userId;
        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => response.json())
        .then((jsonResponse) => {
            userId = jsonResponse.id;
            // POST request to save playlist:
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
            { 
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName })
            }).then((response) => response.json())
            .then((jsonResponse) => {
                const playlistID = jsonResponse.id;
                // Post request to save tracks to new playlist:
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
                { 
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris })
                })
            })
        })
    }

}

export default Spotify;

