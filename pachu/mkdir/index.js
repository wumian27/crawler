const fs = require('fs');
const path = require('path')
function mkdirs(dirname, callback) {
    fs.exists(dirname, (exists) => {
        if(exists) {
            callback();
            console.log(66777);
        } else {
            mkdirs(path.dirname(dirname), ()=> {
                fs.mkdir(dirname, callback)
            })
        }
    })
}


module.exports = mkdirs
