const express = require('express');
const app = new express();

module.exports = (context) => {

    app.get('/lamp/:status', (req, res) => {
        const status = req.params.status;
        if (['on', 'off'].includes(status)) {
            context.boardEvents.emit('relay', status);
            res.send(`Lamp status: ${status}`);
        } else {
            res.send('Wrong params. Use "on" or "off"');
        }
    });

    app.get('/led/:status', (req, res) => {
        const status = req.params.status;
        if (['on', 'off', 'stop', 'blink'].includes(status)) {
            context.boardEvents.emit('led', status);
            res.send(`Led status: ${status}`);
        } else {
            res.send('Wrong params. Use "on", "off" or "stop"');
        }
    });


    return app;
}