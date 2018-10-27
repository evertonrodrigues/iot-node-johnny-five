const fs = require('fs');

module.exports = (board, context) => {
    try {
        const componentsFiles = fs.readdirSync(__dirname);
        componentsFiles.forEach(componentFile => {
            if(componentFile !== 'index.js')
            require(`${__dirname}/${componentFile}`)(board, context);
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}