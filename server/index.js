require('dotenv').config()
const EventEmitter = require('events');
class BoardEmitter extends EventEmitter { }

const context = {
    boardEvents : new BoardEmitter()
}

const app = require('./app')(context);
const board = require('./board')(context);

board.on("ready", () =>{
  app.listen(3000, () => {    
        console.log('Api running...');
    });    
});


