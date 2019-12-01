let button
let gotPermission = false
let notApplicable = false

let cx, cy

function setup() {
  createCanvas(windowWidth, windowHeight)
  background('lightblue')

  if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
    button = createButton('click to allow access to sensors')
    button.style("font-size", "24px")
    button.center()
    button.mousePressed(requestAccess)
  } else {
    notApplicable = true
  }
  
  cx = width/2
  cy = height/2
}

function draw() {
  if (!gotPermission && !notApplicable) return

  const dx = constrain(rotationY, -3, 3)
  const dy = constrain(rotationX, -3, 3)
  cx += dx
  cy += dy
  cx = constrain(cx, -width, width)
  cy = constrain(cy, -height, height)

  ellipse(cx, cy, 150, 150)
}

function requestAccess() {
  if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response == 'granted') {
          gotPermission = true
        }
      })
      .catch(console.error)
  } else {
    alert('DeviceOrientationEvent is not defined. Please use a mobile device.');
    gotPermission = true
  }

  button.remove()
}