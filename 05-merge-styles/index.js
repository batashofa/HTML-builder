const path = require('path');
const fs = require('fs');

const projectDist = path.join(__dirname, '/project-dist');
const bundleCss = path.join(__dirname, '/project-dist/bundle.css');
const Styles = path.join(__dirname, '/styles');


fs.stat(projectDist, (err, stats) => {
  if (!err) {
    removeDist();
  } else {
    creatBundleCss();
  }
})

async function removeDist() {
  await fs.rm(projectDist, {force: true, recursive: true}, (err) => {
    if (err) {
      console.log('The folder cant remove')
    } else {
      creatBundleCss();
    }
  })
}
async function creatBundleCss() {
  await fs.mkdir(projectDist, {recursive: true}, (err) => {
    if (err) throw err;
  });
  await fs.readdir(Styles, (err,files)=> {
    for (const file of files) {
      if(path.extname(file) === '.css') {
        fs.readFile(path.join(Styles,file), 'utf-8', (err, data) => {
          if (err) {
            process.exit();
          }
          fs.appendFile(bundleCss, `${data}\n`, (err) => {
            if (err) throw err;
          });
        });
      }
    }
  })
}