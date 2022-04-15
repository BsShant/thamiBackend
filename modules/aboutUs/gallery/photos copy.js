const {db} = require('../../../utils/db');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({

    destination:(req, file, callback)=>{
        callback(null, path.join(__dirname, '../../../public'));
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
exports.uploadGalleryImage = upload.any();



exports.createNewPhoto =(req,res, next)=>{
    const image = req.files[0].filename;
    let image1, image2, image3, image4, image5, image6, image7;
    req.files.map((file,key)=>{
        // console.log([file.fieldname])
        if(file.fieldname === 'image1'){
            image1 = file.filename
        }
        if(file.fieldname === 'image2'){
            image2 = file.filename
        }
        if(file.fieldname === 'image3'){
            image3 = file.filename
        }
        if(file.fieldname === 'image7'){
            image7 = file.filename
        }
        if(file.fieldname === 'image4'){
            image4 = file.filename
        }
        if(file.fieldname === 'image5'){
            image5 = file.filename
        } if(file.fieldname === 'image6'){
            image6 = file.filename
        }
        return;

    })
    const {albumName, detail, position} = req.body;
    let sql = `INSERT INTO galleryPhoto SET ?`
    let data={albumName: albumName,detail: detail, position:position, image1: image1, image2: image2, image3:image3, image4:image4, image5:image5, image6:image6,image7:image7}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"Gallery Photo created",
            })
        })

}
exports.updateExistingPhoto =(req,res, next)=>{
    let image1, image2, image3, image4, image5, image6, image7;

    const {detail, albumName, position, id} = req.body;
    req.files.map((file,key)=>{
        // console.log([file.fieldname])
        if(file.fieldname === 'image1'){
            image1 = file.filename
        }
        if(file.fieldname === 'image2'){
            image2 = file.filename
        }
        if(file.fieldname === 'image3'){
            image3 = file.filename
        }
        if(file.fieldname === 'image7'){
            image7 = file.filename
        }
        if(file.fieldname === 'image4'){
            image4 = file.filename
        }
        if(file.fieldname === 'image5'){
            image5 = file.filename
        } if(file.fieldname === 'image6'){
            image6 = file.filename
        }
        return;

    })
    const sql = `UPDATE galleryPhoto SET albumName = ?, detail =?, position = ?, image1 =?, image2 = ?, image3 = ?, image4 = ?, image5 = ?, image6 = ?, image7 = ? WHERE id = ?`;

        db.query(sql,[albumName, detail, position, image1, image2, image3, image4, image5, image6, image7, id] ,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Gallery Photo updated",
            })
        })
}
exports.deletePhoto =(req,res, next)=>{
    const {id} = req.body;
    const sql = `DELETE FROM galleryPhoto WHERE id = '${id}'`;

        db.query(sql,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Gallery Photo deleted",
            })
        })
    
}
exports.getAllPhoto =(req,res, next)=>{
    let sql = `SELECT * FROM galleryPhoto`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Gallery Photo fetched",
            data:result
            // data: result[0]
        })
    })
}