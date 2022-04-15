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
exports.uploadGalleryVideo = upload.any();



exports.createNewVideo =(req,res, next)=>{
    const image = req.files.filter((item,id)=>item.fieldname=='image')[0].filename
    const video = req.files.filter((item,id)=>item.fieldname=='video')[0].filename        
    const {title, detail, position} = req.body;
    let sql = `INSERT INTO galleryVideo SET ?`
    let data={title: title,image:image,detail: detail, position:position, video: video}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"Gallery Video created",
            })
        })

}
exports.updateExistingVideoDetail =(req,res, next)=>{
    let image;
    if(req.files[0]){
        image = req.files[0].filename
    }
    else{
        image = req.body.filename
    }
       
    const {detail, title, position, id} = req.body;
   
    const sql = `UPDATE galleryVideo SET title = ?, image = ?,detail =?, position = ? WHERE id = ?`;

        db.query(sql,[title, image, detail, position, id] ,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Gallery Video detail updated",
            })
        })
}
exports.updateExistingVideoFile =(req,res, next)=>{
    

    const video = req.files.filter((item,id)=>item.fieldname=='video')[0].filename    
    const {id} = req.body;
   
    const sql = `UPDATE galleryVideo SET video = ? WHERE id = ?`;

        db.query(sql,[video, id] ,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Gallery Video file updated",
            })
        })
}
exports.deleteVideo =(req,res, next)=>{
    const {id} = req.body;
    const sql = `DELETE FROM galleryVideo WHERE id = '${id}'`;

        db.query(sql,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Gallery Video deleted",
            })
        })
    
}
exports.getAllVideo =(req,res, next)=>{
    let sql = `SELECT * FROM galleryVideo`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Gallery Video fetched",
            data:result
            // data: result[0]
        })
    })
}