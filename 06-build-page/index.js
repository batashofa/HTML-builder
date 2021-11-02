const path = require('path');
const fsProm = require('fs/promises');
const fs = require('fs');

//variables project dist
const projectDist = path.join(__dirname, '/project-dist');
const dist = path.join(__dirname, '/project-dist/');
const projectDistIndex = path.join(__dirname, 'project-dist/index.html');
const projectDistStyle = path.join(__dirname, 'project-dist/style.css');

//variables Index.html(tags)
const headerComponents = path.join(__dirname, 'components', 'header.html');
const articlesComponents = path.join(__dirname, 'components', 'articles.html');
const footerComponents = path.join(__dirname, 'components', 'footer.html');

//variables assets
const assets = path.join(__dirname, '/assets/');

//variables assets copy
const assetsCopy = path.join(__dirname, '/project-dist/assets/');

const Styles = path.join(__dirname, '/styles');


async function createItem() {
    await fsProm.mkdir(projectDist, {recursive: true});
    await fsProm.open(projectDistIndex, 'w');
    await fsProm.open(projectDistStyle, 'w');
}

async function createAssets() {
    await fs.mkdir(assetsCopy, (err)=> {
        if (err) console.log('The folder already exists');
    });
    await fs.readdir(assets, (err, files)=> {
        for (const file of files) {
            fs.mkdir(path.join(assetsCopy, file), {recursive: true}, (err)=> {
                if (err) throw err;
            });
            const assetsFolder = path.join(assets, file);
            const assetsCopyFolder = path.join(assetsCopy, file);
            fs.readdir(assetsFolder, (err, items)=> {
                for (const item of items) {
                    fs.copyFile(path.join(assetsFolder, item), path.join(assetsCopyFolder, item), fs.constants.COPYFILE_EXCL, (err)=> {
                        if (err) {process.exit();}
                    });
                }
            });
        }
    })

}

async function replaceTempTags() {
    fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', async (e, data) => {
        let template = data;
        const reg = /{{(.*)}}/;
        let tag = template.match(reg);
        while (tag !== null) {
            const tagName = tag[1]
            switch (tagName) {
                case 'header':
                    const header = await fsProm.readFile(headerComponents, 'utf-8');
                    template = template.replace(reg, header);
                    break;

                case 'articles':
                    const articles = await fsProm.readFile(articlesComponents, 'utf-8');
                    template = template.replace(reg, articles);
                    break;

                case 'footer':
                    const footer = await fsProm.readFile(footerComponents, 'utf-8');
                    template = template.replace(reg, footer);
                    break;
            }
            tag = template.match(reg)
        }
        fs.writeFile(projectDistIndex, template, err => {
            if (err) throw err;
        })
    })
}

async function creatStyleCss() {
    fs.rm(projectDistStyle, {force: true}, (err)=> {
        if (err) throw err;
    });
    fs.readdir(Styles, (err,files)=> {
        for (const file of files) {
            if(path.extname(file) === '.css') {
                fs.readFile(path.join(Styles,file), 'utf-8', (err, data) => {
                    if (err) {
                        process.exit();
                    }
                    fs.appendFile(projectDistStyle, data, (err) => {
                        if (err) throw err;
                    });
                });
            }
        }
    });
}

createItem();
createAssets();
creatStyleCss();
replaceTempTags();