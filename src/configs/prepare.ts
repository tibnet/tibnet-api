import fs from 'fs'

export default () => {
    mkdir('./files')
    mkdir('./files/attachments')
    mkdir('./files/temps')
}

function mkdir(dir: string) {
    if (!fs.existsSync(dir)) {
        console.log('directory created ' + dir);
        fs.mkdirSync(dir)
    }
}