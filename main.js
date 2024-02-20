import './style.css'

const serverPath = "https://localhost:7157/Forklift/GetPosition";
const serverPollingInterval = 100;

const positionInformation = {
  valid: true,
  x: 0.0,
  y: 0.0,
  orientation: 0.0,
  loaded: false,
  forkHeight: 0.0,
  distance: 0.0
}

const positionNotification = {
  forkliftId: 0,
  partnerKey: "lorem ipsum",
  position: positionInformation
}

const inputInformation = {
  x: 0.0,
  y: 0.0,
  orientation: 0.0,
  forkHeight: 0.0,
}

const tranSpeed = 1;
const forkSpeed = 1;
const rotSpeed = 10;

const informationDisplay = document.createElement("p");

window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyA": {
      inputInformation.x = -1;
      break;
    }
    case "KeyD": {
      inputInformation.x = 1;
      break;
    }
    case "KeyW": {
      inputInformation.y = 1;
      break;
    }
    case "KeyS": {
      inputInformation.y = -1;
      break;
    }
    case "ArrowUp": {
      inputInformation.forkHeight = +1;
      break;
    }
    case "ArrowDown": {
      inputInformation.forkHeight = -1;
      break;
    }
    case "ArrowLeft": {
      inputInformation.orientation = -1;
      break;
    }
    case "ArrowRight": {
      inputInformation.orientation = +1;
      break;
    }

    case "KeyC": {
      sendToApi();
    }

    case "KeyR": {
      positionInformation.valid = true;
      
      positionInformation.x = 0.0;
      positionInformation.y = 0.0;
      
      positionInformation.orientation = 0.0;

      positionInformation.loaded = false;
      positionInformation.forkHeight = 0.0;
      positionInformation.distance = 0.0;

    }

  }

  positionInformation.x += inputInformation.x * tranSpeed;
  positionInformation.y += inputInformation.y * tranSpeed;

  positionInformation.orientation = (positionInformation.orientation + inputInformation.orientation * rotSpeed) % 360;
  if(positionInformation.orientation < 0) {
    positionInformation.orientation += 360; 
  } 
  positionInformation.forkHeight += inputInformation.forkHeight * forkSpeed;

  informationDisplay.innerHTML = "position x: " + positionInformation.x + "<br>"
                               + "position y: " + positionInformation.y + "<br>"
                               + "orientation: " + positionInformation.orientation + "<br>"
                               + "forkHeight: " + positionInformation.forkHeight + "<br>";
});

window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyA": {
      inputInformation.x += (1 - inputInformation.x) / 2;
      break;
    }
    case "KeyD": {
      inputInformation.x -= (1 + inputInformation.x) / 2;
      break;
    }
    case "KeyW": {
      inputInformation.y -= (1 + inputInformation.y) / 2;
      break;
    }
    case "KeyS": {
      inputInformation.y += (1 - inputInformation.y) / 2;
      break;
    }
    case "ArrowUp": {
      inputInformation.forkHeight -= (1 + inputInformation.forkHeight) / 2;
      break;
    }
    case "ArrowDown": {
      inputInformation.forkHeight += (1 - inputInformation.forkHeight) / 2;
      break;
    }
    case "ArrowLeft": {
      inputInformation.orientation += (1 - inputInformation.orientation) / 2;
      break;
    }
    case "ArrowRight": {
      inputInformation.orientation -= (1 + inputInformation.orientation) / 2;
      break;
    }
  }
});

function serverPolling() {
  setInterval(sendToApi,serverPollingInterval);
}

function sendToApi() {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(positionNotification)
  };
  fetch('https://localhost:7157/Forklift/PutPosition', requestOptions)
}


serverPolling();
document.body.appendChild(informationDisplay);

