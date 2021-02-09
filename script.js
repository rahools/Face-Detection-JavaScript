// const video = document.getElementById('video')

// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//   faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//   faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//   faceapi.nets.faceExpressionNet.loadFromUri('/models')
// ]).then(startVideo)

// function startVideo() {
//   navigator.getUserMedia(
//     { video: {} },
//     stream => video.srcObject = stream,
//     err => console.error(err)
//   )
// }

// video.addEventListener('play', () => {
//   const canvas = faceapi.createCanvasFromMedia(video)
//   document.body.append(canvas)
//   const displaySize = { width: video.width, height: video.height }
//   faceapi.matchDimensions(canvas, displaySize)
//   setInterval(async () => {
//     const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
//     const resizedDetections = faceapi.resizeResults(detections, displaySize)
//     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//     faceapi.draw.drawDetections(canvas, resizedDetections)
//     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//     faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//   }, 100)
// })

// load models
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('models'),
  faceapi.nets.faceExpressionNet.loadFromUri('models')
]).then(test)

function failed() {
  console.error("File isn't a image.");
}

async function test() {
  const tdiv = document.getElementById("img_inp")

  // dynamically set onchange func
  document.getElementById('img_inp').onchange = function(e) {
    var img = new Image();
    img.onload = detect;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
  }
}

async function detect() {
  // get the canvas
  var canvas = document.getElementById('canvas');

  // set canvas' dims
  const displaySize = { width: this.width, height: this.height }
  faceapi.matchDimensions(canvas, displaySize)

  // get detections
  const detections = await faceapi.detectAllFaces(this, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

  // resize/format detections
  const resizedDetections = faceapi.resizeResults(detections, displaySize)

  // clear canvas and draw base img
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(this, 0,0);

  // now draw predictions
  faceapi.draw.drawDetections(canvas, resizedDetections)
  faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
  faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
}