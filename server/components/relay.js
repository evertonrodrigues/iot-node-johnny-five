const five = require("johnny-five");

module.exports = (board, context) => {

    const relay = new five.Relay({ pin: 5, type: 'NC' });
    // Control the relay in real time from the REPL by typing commands, eg.
    // relay.on();
    // relay.off();

    board.repl.inject({
        relay: relay
    });

    context.boardEvents.on('relay', (status) => {
        console.log(`Change relay status to ${status}`);
        relay[status]();
    });

}