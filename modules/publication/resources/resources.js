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
exports.uploadpublicationResources = upload.any();



exports.createResources =(req,res, next)=>{
    const image = req.files[0].filename;
    const {title, detail, buttonName} = req.body;
    let sql = `INSERT INTO publicationResources SET ?`
    let data={title: title, detail: detail,buttonName:buttonName, image:image}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"Publication Resources created",
            })
        })

}
exports.updateExistingResources =(req,res, next)=>{
    let image;
    if(req.files[0]){
        image = req.files[0].filename
    }
    else{
        image = req.body.filename
    }
        const {title, detail, buttonName, id} = req.body;
    const sql = `UPDATE publicationResources SET title = ?, image = ?, detail = ?,buttonName = ? WHERE id = ?`;

        db.query(sql,[title, image, detail, buttonName, id],(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Publication Resources updated",
            })
        })
}
exports.deleteResources =(req,res, next)=>{
    const {id} = req.body;
    const sql = `DELETE FROM publicationResources WHERE id = '${id}'`;

        db.query(sql,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Publication Resources deleted",
            })
        })
    
}
exports.getAllResources =(req,res, next)=>{
    let sql = `SELECT * FROM publicationResources`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Publication Resources fetched",
            data:result
            // data: result[0]
        })
    })
}