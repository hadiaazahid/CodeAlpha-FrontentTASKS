const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const sideCover = document.getElementById("sideCover");
const sideTitle = document.getElementById("sideTitle");
const sideArtist = document.getElementById("sideArtist");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const muteBtn = document.getElementById("muteBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
const autoplay = document.getElementById("autoplay");
const playlist = document.getElementById("playlist");
const search = document.getElementById("search");
const songCount = document.getElementById("songCount");
const playlistItems = document.querySelectorAll(".playlist-item");
const navItems = document.querySelectorAll(".nav-item");


const songs = [
    {
        title: "Midnight Dreams",
        artist: "Luna",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700"
    },
    {
        title: "Echoes of Silence",
        artist: "Vibe Realm",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700"
    },
    {
        title: "Neon Horizon",
        artist: "Synthwave Pulse",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700"
    },
    {
        title: "Electric Avenue",
        artist: "Urban Drift",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700"
    },
    {
        title: "Starlight Voyage",
        artist: "Celestial Sound",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=700"
    },
    {
        title: "Golden Memories",
        artist: "Acoustic Tales",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=700"
    },
    {
        title: "Urban Rhythm",
        artist: "Beat Mechanics",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=700"
    },
    {
        title: "Velvet Groove",
        artist: "Midnight Jazz",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        cover: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=700"
    },
    {
        title: "Deep Focus",
        artist: "Ambient Flow",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=700"
    },
    {
        title: "Solar Flare",
        artist: "Cosmic Beats",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=700"
    },
    {
        title: "Ambient Chill",
        artist: "Serene Minds",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        cover: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=700"
    }
];


let currentSong = 0;
let isShuffle = false;
let isRepeat = false;
let previousVolume = 0.8;
let favorites = JSON.parse(localStorage.getItem("melodyFavorites")) || [];
let currentFilter = "all";




function loadSong(index) {
    currentSong = index;
    const song = songs[currentSong];
    audio.src = song.src;
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    sideCover.src = song.cover;
    sideTitle.textContent = song.title;
    sideArtist.textContent = song.artist;
    progress.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
    updateFavorite();
    updatePlaylist();
}




function playSong() {
    audio.play()
        .then(() => {
            console.log("Playing:", songs[currentSong].title);
        })
        .catch(error => {
            console.error("Audio could not play:", error);
        });
}




function pauseSong() {
    audio.pause();
}




playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});




audio.addEventListener("play", () => {
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playBtn.title = "Pause";
    cover.classList.add("playing");
});




audio.addEventListener("pause", () => {
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    playBtn.title = "Play";
    cover.classList.remove("playing");
});




function nextSong() {
    if (isShuffle) {
        let next;
        do {
            next = Math.floor(Math.random() * songs.length);
        } while (next === currentSong && songs.length > 1);
        currentSong = next;
    } else {
        currentSong++;
        if (currentSong >= songs.length) {
            currentSong = 0;
        }
    }
    loadSong(currentSong);
    playSong();
}




function previousSong() {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    }
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    loadSong(currentSong);
    playSong();
}


nextBtn.addEventListener("click", nextSong);


prevBtn.addEventListener("click", previousSong);




audio.addEventListener("timeupdate", () => {
    if (!audio.duration) {
        return;
    }
    const percentage = (audio.currentTime / audio.duration) * 100;
    progress.value = percentage;
    currentTime.textContent = formatTime(audio.currentTime);
});




audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
    updatePlaylistDuration();
});




progress.addEventListener("input", () => {
    if (!audio.duration) {
        return;
    }
    audio.currentTime = (progress.value / 100) * audio.duration;
});




function formatTime(time) {
    if (isNaN(time) || !isFinite(time)) {
        return "0:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}




audio.volume = 0.8;
volume.value = 0.8;


volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
    if (audio.volume > 0) {
        previousVolume = audio.volume;
    }
    updateVolumeIcon();
});




muteBtn.addEventListener("click", () => {
    if (audio.volume > 0) {
        previousVolume = audio.volume;
        audio.volume = 0;
        volume.value = 0;
    } else {
        audio.volume = previousVolume || 0.8;
        volume.value = audio.volume;
    }
    updateVolumeIcon();
});




function updateVolumeIcon() {
    if (audio.volume === 0) {
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        muteBtn.title = "Unmute";
    } else if (audio.volume < 0.5) {
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
        muteBtn.title = "Mute";
    } else {
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        muteBtn.title = "Mute";
    }
}




shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("active", isShuffle);
    shuffleBtn.title = isShuffle ? "Shuffle On" : "Shuffle Off";
});




repeatBtn.addEventListener("click", () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle("active", isRepeat);
    repeatBtn.title = isRepeat ? "Repeat On" : "Repeat Off";
});




audio.addEventListener("ended", () => {
    if (isRepeat) {
        audio.currentTime = 0;
        playSong();
        return;
    }
    if (autoplay.checked) {
        nextSong();
    }
});




favoriteBtn.addEventListener("click", () => {
    if (favorites.includes(currentSong)) {
        favorites = favorites.filter(index => index !== currentSong);
    } else {
        favorites.push(currentSong);
    }
    localStorage.setItem("melodyFavorites", JSON.stringify(favorites));
    updateFavorite();
    updatePlaylist();
});




function updateFavorite() {
    const liked = favorites.includes(currentSong);
    favoriteBtn.classList.toggle("active", liked);

    if (liked) {
        favoriteBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
        favoriteBtn.title = "Remove from favorites";
    } else {
        favoriteBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
        favoriteBtn.title = "Add to favorites";
    }
}




playlistItems.forEach((item) => {
    item.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = Number(item.dataset.index);
        loadSong(index);
        playSong();
    });
});




function updatePlaylist() {
    let visibleSongs = 0;

    playlistItems.forEach((item) => {
        const index = Number(item.dataset.index);
        const isLiked = favorites.includes(index);

        let matchesFilter = true;
        if (currentFilter === "liked") {
            matchesFilter = isLiked;
        }

        const searchValue = search.value.toLowerCase().trim();
        const songTitle = item.querySelector("h4").textContent.toLowerCase();
        const songArtist = item.querySelector("p").textContent.toLowerCase();
        const matchesSearch = songTitle.includes(searchValue) || songArtist.includes(searchValue);

        if (matchesFilter && matchesSearch) {
            item.style.display = "flex";
            visibleSongs++;
        } else {
            item.style.display = "none";
        }

        item.classList.toggle("active", index === currentSong);

        const icon = item.querySelector(".item-play i");
        if (!icon) return;

        if (index === currentSong && !audio.paused) {
            icon.className = "fa-solid fa-pause";
        } else {
            icon.className = "fa-solid fa-play";
        }
    });

    songCount.textContent = `${visibleSongs} ${visibleSongs === 1 ? "Song" : "Songs"}`;
}




audio.addEventListener("play", updatePlaylist);


audio.addEventListener("pause", updatePlaylist);




function updatePlaylistDuration() {
    const item = document.querySelector(`.playlist-item[data-index="${currentSong}"]`);
    if (!item) return;

    const durationElement = item.querySelector(".item-duration");
    if (durationElement) {
        durationElement.textContent = formatTime(audio.duration);
    }
}



search.addEventListener("input", () => {
    updatePlaylist();
});




navItems.forEach((item, navIndex) => {
    item.addEventListener("click", () => {
        navItems.forEach(nav => nav.classList.remove("active"));
        item.classList.add("active");

        if (navIndex === 1) {
            currentFilter = "liked";
        } else {
            currentFilter = "all";
        }

        updatePlaylist();
    });
});




document.addEventListener("keydown", event => {
    if (event.target.tagName === "INPUT") {
        return;
    }

    if (event.code === "Space") {
        event.preventDefault();
        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }
    }

    if (event.code === "ArrowRight") {
        nextSong();
    }

    if (event.code === "ArrowLeft") {
        previousSong();
    }

    if (event.code === "ArrowUp") {
        event.preventDefault();
        audio.volume = Math.min(1, audio.volume + 0.05);
        volume.value = audio.volume;
        updateVolumeIcon();
    }

    if (event.code === "ArrowDown") {
        event.preventDefault();
        audio.volume = Math.max(0, audio.volume - 0.05);
        volume.value = audio.volume;
        updateVolumeIcon();
    }
});




audio.addEventListener("error", () => {
    console.error("Unable to load audio:", songs[currentSong].src);
});





loadSong(0);
updateVolumeIcon();
updatePlaylist();