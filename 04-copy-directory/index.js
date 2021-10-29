const path = require('path');
const fs = require('fs');

const filesCopy = path.join(__dirname, '/files-copy');
const filesDir = path.join(__dirname, '/files');

async function copyDir() {
  fs.stat(filesCopy, function(err, stats) {
    if (err) {
      fs.mkdir(filesCopy, { recursive: true }, (err) => {
        if (err) throw err;
      });
      fs.readdir(filesDir, (err,files)=> {
        for (const file of files) {
          fs.copyFile(path.join(filesDir, file), path.join(filesCopy, file), fs.constants.COPYFILE_EXCL, (err)=> {
            if (err) {process.exit();}
          });
        }
      });
    } else {
      fs.readdir(filesCopy, (err, files) => {
        if (err) {process.exit();}
        for (const file of files) {
          fs.unlink(path.join(filesCopy, file), err => {
            if (err) throw err;
          });
        }
      });
      fs.rmdir(filesCopy, err => {
        // if (err) throw err;
      });
    }
    fs.mkdir(filesCopy, { recursive: true }, (err) => {
      if (err) throw err;
    });
    fs.readdir(filesDir, (err,files)=> {
      for (const file of files) {
        fs.copyFile(path.join(filesDir, file), path.join(filesCopy, file), fs.constants.COPYFILE_EXCL, (err)=> {
          if (err) {process.exit();}

        });
      }
    });
  });
}

copyDir();