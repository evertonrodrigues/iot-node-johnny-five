require('dotenv').config()
const EventEmitter = require('events');
class BoardEmitter extends EventEmitter { }

const context = {
    boardEvents : new BoardEmitter()
}

const app = require('./app')(context);
const board = require('./board')(context);

const port = process.env.SERVER_PORT || 3000;

board.on("ready", () =>{
  app.listen(port, () => {    
        console.log(`Api running on port ${port}`);
    });    
});


