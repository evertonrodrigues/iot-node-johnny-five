const EtherPortClient = require("etherport-client").EtherPortClient;
const five = require("johnny-five");
const relay = require('./components/relay');
const led = require('./components/led');

module.exports = (context) => {

    const board = new five.Board({
        port: new EtherPortClient({
            host: new String(process.env.DEVICE_STATIC_IP_ADDRESS || process.env.DEVICE_IP_ADDRESS).replace(',', '.'),
            port: process.env.DEVICE_SERVER_PORT || 3030
        }),
        timeout: 15000,
        repl: true,
        debug: true
    });

    board.on("ready", function () {
        console.log('Board ready');

        //relay(context);

        led(this, context);      
    });

    return board;

}
