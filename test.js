const { getVideoDurationInSeconds } = require('get-video-duration');
const path = require('path');

getVideoDurationInSeconds(
    'http://localhost:5000/video-mp41617890540859.mp4'
).then((duration) => {
    console.log(new Date(duration * 1000).toISOString().substr(11, 8))
})

// getVideoDurationInSeconds(video).then((duration) => {
//     console.log(new Date(duration * 1000).toISOString().substr(11, 8))
// })