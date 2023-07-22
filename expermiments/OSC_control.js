const osc = require("osc");

const udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",  // Adresse IP locale (écoute toutes les interfaces)
    localPort: 8000,         // Port local pour la communication OSC
    remoteAddress: "127.0.0.1", // Adresse IP distante (destination des messages OSC)
    remotePort: 8080         // Port distant pour la communication OSC
});

udpPort.open();

udpPort.on('ready', () => {
    console.log('Port d\'écoute UDP ouvert et prêt à recevoir des données OSC.');
});



// Événement déclenché lorsqu'un message OSC est reçu
udpPort.on('message', (oscMessage) => {
    console.log('Message reçu :', oscMessage);
    // Traitez le message ici selon vos besoins
});

const posX = 200;

const message = {
    address: '',
    args: 0
  };

  function sendOSCdata(adresse, valeur)
{   
    message.address = adresse;
    message.args = valeur;
    udpPort.send(message);
}

let i = 0;
const increment = 0.01;
const target = 1;
const duration = 300; // 0.5 secondes
const interval = duration / ((target - i) / increment);

function updateVariable(layer) {
  console.log(i); 
    sendOSCdata('/'+layer+'/opacity',i);
    sendOSCdata('/'+layer+'/position/x',-posX+i*posX);
  if (i >= target) {
    clearInterval(timer);
    console.log("Terminé !");
  } else {
    i += increment;
  }
}

const timer = setInterval(() => {
    updateVariable('test');
  }, interval); 

sendOSCdata('/layer:test/position/y/?',0);

  