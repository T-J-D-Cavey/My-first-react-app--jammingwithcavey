let accessToken; 
const clientID = "2711362ce6bc4295a166696328b5f946";
const redirectUri = "http://localhost:3000/";

let Spotify = {
    getAccessToken() {
        if (userAccessToken) {
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
                const accessUrl = `https://accounts.spotify.com/authorize?
                client_id=${clientID}&response_type=token&
                scope=playlist-modify-public&redirect_uri=${redirectUri}`;
                window.location = accessUrl;
            }
        
    }
};

export default Spotify;

