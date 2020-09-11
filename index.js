const readline = require('readline');
const fs = require('fs');
require('dotenv').config(); // read in vars from .env
const chokidar = require('chokidar'); // watch directory for new files

const logger = fs.createWriteStream(process.env.LOG, {
  flags: 'a'
})

chokidar.watch(process.env.DIR).on('all', (event, path) => {
    if (path == process.env.FILE && event == 'add'){
        readline.createInterface({
            input: fs.createReadStream(process.env.DIR + process.env.FILE),
            output: process.stdout,
            console: false
        }).on('line', function(line) {
            let d = new Date();
            let fd = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()} UTC`
            if (line != '') logger.write(`${fd} ${line}\n`);
        })
        fs.rename(`${process.env.DIR}${process.env.FILE}`, `${process.env.DIR}${process.env.FILE}.${(new Date()).getTime()}`, (err) => {
            if (err) throw err;
            console.log('Rename complete!');
        })
    }
});