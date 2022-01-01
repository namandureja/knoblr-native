const {ipcRenderer} = require('electron');

navigator.getUserMedia({video: true, audio: false}, (localMediaStream) => {
    var video = document.querySelector('.circle')
    video.srcObject = localMediaStream
    video.autoplay = true
 }, (e) => {})

  document.querySelector('.close').addEventListener("click", function (e) {
    ipcRenderer.send('close-me')
  }); 
