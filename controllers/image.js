const {db} = require('../utils/db');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({

    destination:(req, file, callback)=>{
        callback(null, path.join(__dirname, '../public'));
    },
        filename: (req, file, callback)=>{
            const ext = file.mimetype.split("/")[1]
            console.log(file.mimetype)
            callback(null, `${file.originalname}`)
        }
    })

const upload = multer({
    storage: storage
})
exports.uploadSingle = upload.any();

exports.image = (req, res, next)=>{
    const image = req.files[0].filename;
        return res.json({
            message:"Your Publication has been updated",
            image:image
        })
}