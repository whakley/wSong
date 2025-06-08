
async function fetchData() {
    try {
        const response = await fetch("http://localhost:3000/api/data");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Data fetched successfully:", data);
        return data;
    }catch (error) {
    console.error("Error fetching data:", error);
}
}

let spotify_access_token = "";
async function fetchArtistData(artistId) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${spotify_access_token}`,
            }
        });
        return response.json()
    }catch (error) {
        console.error("Error fetching artist data:", error);
    }
}

async function main() {
    const spotify_token = await fetchData(); 
    spotify_access_token = spotify_token.access_token;
}
main();

async function getOAuthToken() {
    try {
        const response = await fetch('http://localhost:3000/auth/token');
        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('OAuth token fetched successfully:', data);
        return data.access_token;
    } catch (error) {
        console.error('Error fetching OAuth token:', error);
    }
}
window.onSpotifyWebPlaybackSDKReady = () => {
            const token = getOAuthToken();
            const player = new Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('initialization_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('account_error', ({ message }) => {
                console.error(message);
            });

            document.getElementById('play-button').onclick = function() {
              player.togglePlay();
            };

            player.connect();
        }
 

play_button = document.getElementById("play-button");
play_button.addEventListener("click", function() {
    if (play_button.classList.contains("playing")) {
        play_button.classList.remove("playing");
        play_button.innerHTML = '<img src = "assets/img/play.png">';

        
    } else {
        play_button.classList.add("playing");
        play_button.innerHTML = '<img src = "assets/img/pause.png">';

        
    }
});
prev_button = document.getElementById("prev-button");
prev_button.addEventListener("click", function() {
    console.log("Previous track button clicked");
    const artist = fetchArtistData("6YVMFz59CuY7ngCxTxjpxE").then(artist => {
    console.log("Artist data:", artist);
})

});
