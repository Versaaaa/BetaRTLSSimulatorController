import './style.css'

const serverPath = "https://localhost:7157/Forklift/GetPosition";
const serverPollingInterval = 100;

const positionInformation = {
  x: 0,
  y: 0,
  rotation: 0,
  forkHeight: 0
}

const inputInformation = {
  x: 0,
  y: 0,
  rotation: 0,
  forkHeight: 0,
}

const tranSpeed = 1;
const forkSpeed = 1;
const rotSpeed = 1;

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
      inputInformation.rotation = -1;
      break;
    }
    case "ArrowRight": {
      inputInformation.rotation = +1;
      break;
    }

    case "KeyC": {
      sendToApi();
    }

    case "KeyR": {
      positionInformation.x = 0;
      positionInformation.y = 0;
      positionInformation.rotation = 0;
      positionInformation.forkHeight = 0;
    }

  }

  positionInformation.x += inputInformation.x * tranSpeed;
  positionInformation.y += inputInformation.y * tranSpeed;

  positionInformation.rotation += inputInformation.rotation * rotSpeed;
  positionInformation.forkHeight += inputInformation.forkHeight * forkSpeed;

  informationDisplay.innerHTML = "position x: " + positionInformation.x + "<br>"
                               + "position y: " + positionInformation.y + "<br>"
                               + "rotation: " + positionInformation.rotation + "<br>"
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
      inputInformation.rotation += (1 - inputInformation.rotation) / 2;
      break;
    }
    case "ArrowRight": {
      inputInformation.rotation -= (1 + inputInformation.rotation) / 2;
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
      body: JSON.stringify(positionInformation)
  };
  fetch('https://localhost:7157/Forklift/PutPosition', requestOptions)
}


serverPolling();
document.body.appendChild(informationDisplay);

