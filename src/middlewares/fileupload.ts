import pathConfig from "@configs/path.config";
import multer from "multer";
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
    destination(req, file, callback) {
        const organizationId = req.params.orgId
        const folder = path.join(pathConfig.tempsPath, organizationId)
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder)
        }
        callback(null, folder)
    },
    filename(req, file, callback) {
        callback(null, file.originalname)
    }
})

export const upload = multer({ storage })