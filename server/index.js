require('dotenv').config()
const EventEmitter = require('events');

const context = {
    boardEvents : new EventEmitter()
}

const app = require('./app')(context);
const board = require('./board')(context);

const port = process.env.SERVER_PORT || 3000;

board.on("ready", () =>{
  app.listen(port, () => {    
        console.log(`Api running on port ${port}`);
    });    
});


