const path = require('path');
const fs = require('fs');

const projectDist = path.join(__dirname, '/project-dist/bundle.css');
const Styles = path.join(__dirname, '/styles');

async function creatBundleCss() {
  fs.rm(projectDist, {force: true}, (err)=> {
    if (err) throw err;
  });
  fs.readdir(Styles, (err,files)=> {
    for (const file of files) {
      if(path.extname(file) === '.css') {
        fs.readFile(path.join(Styles,file), 'utf-8', (err, data) => {
          if (err) {
            process.exit();
          }
          fs.appendFile(projectDist, data, (err) => {
            if (err) throw err;
          });
        });
      }
    }
  });
}

creatBundleCss();