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
exports.uploadSupportPage = upload.any();



exports.createSupportPage =(req,res, next)=>{
    const image = req.files[0].filename;
    const {name, detail, address,sn,phone, heading} = req.body;
    let sql = `INSERT INTO getInvolvedSupportPage SET ?`
    let data={name: name,sn:sn, address: address ,phone: phone,heading:heading ,detail: detail,image:image}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Get Involved Support Community created",
            })
        })

}
exports.updateExistingSupportPage =(req,res, next)=>{
    let image;
    if(req.files[0]){
        image = req.files[0].filename
    }
    else{
        image = req.body.filename
    }
        const {name,phone, detail, address, heading,sn,id} = req.body;
    const sql = `UPDATE getInvolvedSupportPage SET name = ?,heading = ?,address = ?, image = ?, detail = ?,phone = ?,sn = ? WHERE id = ?`;

        db.query(sql,[name, heading, address, image, detail, phone,sn, id],(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Get Involved Support Community updated",
            })
        })
}
exports.deleteSupportPage =(req,res, next)=>{
    const {id} = req.body;
    const sql = `DELETE FROM getInvolvedSupportPage WHERE id = '${id}'`;

        db.query(sql,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Get Involved Support Community deleted",
            })
        })
    
}
exports.getAllSupportPage =(req,res, next)=>{
    let sql = `SELECT * FROM getInvolvedSupportPage`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Get Involved Support Community fetched",
            data:result
            // data: result[0]
        })
    })
}