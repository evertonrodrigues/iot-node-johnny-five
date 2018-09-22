const five = require("johnny-five");

module.exports = (board, context) => {

    const led = new five.Led(5);

    // This will grant access to the led instance
    // from within the REPL that's created when
    // running this program.
    board.repl.inject({
        led: led
    });

    led.blink();

    context.boardEvents.on('led', (status) => {
        console.log(`Change led status to ${status}`);
        led[status]();
    });

    return led;

}