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
exports.uploadDonate = upload.any();



exports.createDonate =(req,res, next)=>{
    const logo = req.files[0].filename;
    const {heading, detail} = req.body;
    let sql = `INSERT INTO getInvolvedDonate SET ?`
    let data={heading: heading, detail: detail,logo:logo}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Get Involved Donate Info created",
            })
        })

}
exports.updateExistingDonate =(req,res, next)=>{
    let logo;
    if(req.files[0]){
        logo = req.files[0].filename
    }
    else{
        logo = req.body.filename
    }
    console.log(logo)
    const {heading,detail,id} = req.body;
    const sql = `UPDATE getInvolvedDonate SET heading = ?, logo = ?, detail = ? WHERE id = ?`;

        db.query(sql,[heading, logo, detail, id] ,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Get Involved Donate Info updated",
            })
        })
}
exports.deleteDonate =(req,res, next)=>{
    const {id} = req.body;
    const sql = `DELETE FROM getInvolvedDonate WHERE id = '${id}'`;

        db.query(sql,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Get Involved Donate Info deleted",
            })
        })
    
}
exports.getAllDonate =(req,res, next)=>{
    let sql = `SELECT * FROM getInvolvedDonate`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Get Involved Donate Info fetched",
            data:result
            // data: result[0]
        })
    })
}