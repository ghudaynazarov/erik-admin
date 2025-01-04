const fs = require("fs");
const delFile = (path) => {
    fs.unlink(path, (err) => {
      if (err) {
        throw err;
      }
    });
};

module.exports = delFile;