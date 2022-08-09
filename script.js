console.log("welcome to my app");

let songIndex = 0;
let audioElement = new Audio('/song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let masterPlaySong = document.getElementById('masterPlaySong');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "Barish", filePath: "/song/1.mp3", coverPath: "/cover/backR.jpg" },
    { songName: "Jatihu", filePath: "/song/2.mp3", coverPath: "/cover/bacL.jpg" },
    { songName: "Merima", filePath: "/song/3.mp3", coverPath: "/cover/bacLL.jpg" },
    { songName: "Perfume", filePath: "/song/4.mp3", coverPath: "/cover/bacR.jpg" },
    { songName: "Soljar", filePath: "/song/5.mp3", coverPath: "/cover/bacRR.jpg" }
];
// console.log(songs.length[3]);
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});


masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        masterPlaySong.innerHTML = songs[songIndex].songName;
        
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});


   


audioElement.addEventListener('timeupdate', () => {
    progress = parseFloat((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    // if(progress = '100%'){
    //     Next
    // }
    // console.log(Next);
})

// persent = (currentTime/duration)*100;
//then     ct = (persent*duration)/100;

myProgressBar.addEventListener('change', () => {
    audioElement.pause()
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    audioElement.play()
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        masterPlaySong.innerHTML = songs[songIndex].songName;
        // audioElement.play();
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex =parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `song/${songIndex+1}.mp3`;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        audioElement.currentTime = 0;
        audioElement.play();
        const containerEl = document.querySelector('.container');
        containerEl.style.backgroundImage = `url(${songs[index].coverPath})`
        // containerEl.style.backgroundImage.classList.add('anime');
        masterPlaySong.innerHTML = songs[songIndex].songName;
        gif.style.opacity = 1;
    })

});

  document.getElementById('next').addEventListener('click', Next);
  
   function Next() {
    if (songIndex >= 4) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    audioElement.src = `song/${songIndex+1}.mp3`;
    audioElement.play();
    masterPlaySong.innerHTML = songs[songIndex].songName;
    gif.style.opacity = 1;
}
audioElement.addEventListener('ended', Next);



document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 4;
    } else {
        songIndex -= 1;
    }
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    audioElement.src = `song/${songIndex+1}.mp3`;
    audioElement.play();
    masterPlaySong.innerHTML = songs[songIndex].songName;
    gif.style.opacity = 1;
});        

 