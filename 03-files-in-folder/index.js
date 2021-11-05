const path = require('path');
const fs = require('fs/promises');

const filePath = path.join(__dirname, 'secret-folder');

async function getFiles() {
    const items = await fs.readdir(filePath, (err, items) => {
        return items;
    });

    for (const item of items) {
        const itemFold = path.join(filePath, item);
        const stat = await fs.stat(itemFold, (err, stat) => {
            return stat;
        });

        if (!stat.isDirectory()) {
            const nameFile = path.parse(itemFold).name;
            const extenFile = path.parse(itemFold).ext.slice(1);
            const weightFile = stat.size/1024+'kb';
            console.log((`${nameFile} - ${extenFile} - ${weightFile}`));
        }
    }
}
console.log('Info about files from directory secret-folder:');
getFiles();