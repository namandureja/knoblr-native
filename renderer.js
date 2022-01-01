const {ipcRenderer} = require('electron');

navigator.getUserMedia({video: true, audio: false}, (localMediaStream) => {
    var video = document.getElementById('circle')
    video.srcObject = localMediaStream
    video.autoplay = true
 }, (e) => {})

  document.getElementById('close').addEventListener("click", function (e) {
    ipcRenderer.send('close-me')
  }); 
