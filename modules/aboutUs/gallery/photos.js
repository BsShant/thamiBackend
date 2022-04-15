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
    
    const {title, position} = req.body;
    let sql = `INSERT INTO galleryPhoto SET ?`
    let data={title: title, position:position, image: image}
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
    let image;
    if(req.files[0]){
        image = req.files[0].filename
    }
    else{
        image = req.body.filename
    }
    const {title, position, id} = req.body;
   
    const sql = `UPDATE galleryPhoto SET title = ?, position = ?, image =? WHERE id = ?`;

        db.query(sql,[title, position, image,id] ,(error, result)=>{
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