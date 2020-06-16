(function exportController() {
    class Controller {
    
    constructor(ship) {
        this.ship = ship;
        this.initialiseSea();

        document.querySelector('#sailbutton').addEventListener('click', () => {
            this.setSail();
        });

        document.querySelector("#addButton").addEventListener("click", (e) => {
            e.preventDefault();
            this.addPort();
            this.renderPorts(ship.itinerary.ports);
            this.renderShip();
            this.createDisplay();
            document.getElementById("input").value = "";
          });

    };

    initialiseSea() {
        const backgrounds = ['./images/water0.png', './images/water1.png'];
      
        let backgroundIndex = 0;

        window.setInterval(() => {
            document.querySelector('#viewport').style.backgroundImage = `url('${
                backgrounds[backgroundIndex % backgrounds.length]
            }')`;
            backgroundIndex += 1;
        }, 600);
    }

    renderPorts(ports) {
        const portsElement = document.querySelector('#ports');

        portsElement.style.width = '0px';

        ports.forEach((port, index) => {
            if (!document.querySelector(`[data-port-name=${port.name}]`)) {
                const newPortElement = document.createElement('div');
        
            newPortElement.className = 'port';
            newPortElement.dataset.portName = port.name;
            newPortElement.dataset.portIndex = index;


            portsElement.appendChild(newPortElement);

            const portsElementWidth = parseInt(portsElement.style.width, 10);
            portsElement.style.width = `${portsElementWidth + 256}px`;
            }
        });
    }

    renderShip() {
        const ship = this.ship;

        const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const portElement = document.querySelector(`[data-port-index = '${shipPortIndex}']`);

        const shipElement = document.querySelector('#ship');
        shipElement.style.top = `${portElement.offsetTop + 32}px`;
        shipElement.style.left = `${portElement.offsetLeft - 32}px`;
    };

    setSail() {
        const ship = this.ship;

        const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const nextPortIndex = currentPortIndex + 1;
        const nextPortElement = document.querySelector(`[data-port-index = '${nextPortIndex}']`);

        if (!ship.currentPort) {
            return this.renderMessage(`No ports to sail to!`);
        }

        if (!nextPortElement) {
           return this.renderMessage(`End of our journey!`);
        }

        this.renderMessage(`Now departing ${ship.currentPort.name}`);
        ship.setSail();

        const shipElement = document.querySelector('#ship');
        const sailInterval = setInterval(() => {
            const shipLeft = parseInt(shipElement.style.left, 10);
            if (shipLeft === (nextPortElement.offsetLeft - 32)) {
                ship.dock();
                this.createDisplay();
                this.renderMessage(`Arrived at ${ship.currentPort.name}`);
                clearInterval(sailInterval);
            }
            
            shipElement.style.left = `${shipLeft + 1}px`;
        }, 20);
    }

    renderMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.id = 'message';
        messageElement.innerHTML = message;

        const viewport = document.querySelector('#viewport');
        viewport.appendChild(messageElement);

        setTimeout(() => {
            viewport.removeChild(messageElement);
        }, 1250);
    }

    createDisplay() {
        const ship = this.ship;
        const nextPortIndex = ship.itinerary.ports.indexOf(ship.currentPort) + 1;

        const currentPortElement = document.getElementById("displayCurrPort");
        const nextPortElement = document.getElementById("displayNextPort");

        currentPortElement.innerHTML = `Current Port: ${ship.currentPort.name}`

        if (nextPortIndex < ship.itinerary.ports.length) {
            nextPortElement.innerHTML = `Next Port: ${ship.itinerary.ports[nextPortIndex].name}`;
        } else {
            nextPortElement.innerHTML = "End of our journey!"
        };
    }

    addPort() {
        const ship = this.ship;
  
        const newPort = document.getElementById("input").value;
  
        const portObject = new Port(newPort);
  
        if (newPort === "") {
          return this.renderMessage("Please add a port name to procceed!");
        }

        ship.itinerary.ports.push(portObject);
  
        if (!ship.currentPort) {
          ship.currentPort = ship.itinerary.ports[0];
        }
      }

}

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
}());