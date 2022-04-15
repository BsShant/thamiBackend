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
exports.uploadBooks = upload.any();



exports.createBooks=(req,res, next)=>{
    // const image = req.files[0].filename;
    const image = req.files.filter((item,id)=>item.fieldname=='image')[0].filename

    const file = req.files.filter((item,id)=>item.fieldname=='file')[0].filename
   

    const {title, detail, buttonName, type, writer} = req.body;
    let sql = `INSERT INTO publicationBooks SET ?`
    let data={title: title, detail: detail,buttonName:buttonName, image:image, type: type, writer:writer, file:file}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"Publication Books created",
            })
        })

}
exports.updateExistingBookDetail =(req,res, next)=>{
    let image;
    if(req.files[0]){
        image = req.files[0].filename
    }
    else{
        image = req.body.filename
    }
    // const file = req.files.filter((item,id)=>item.fieldname=='file')[0].filename   
    const {title, detail, buttonName,type, writer, id} = req.body;
    const sql = `UPDATE publicationBooks SET title = ?, image = ?, detail = ?,buttonName = ?,type=?, writer=? WHERE id = ?`;

        db.query(sql,[title, image, detail, buttonName, type, writer, id],(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Publication Book detail updated",
            })
        })
}
exports.updateExistingBookFile =(req,res, next)=>{

    const file = req.files.filter((item,id)=>item.fieldname=='file')[0].filename   
    console.log(file) 
    const {id} = req.body;

    const sql = `UPDATE publicationBooks SET file=? WHERE id = ?`;

        db.query(sql,[file, id],(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Publication Books File updated",
            })
        })
}
exports.deleteBooks =(req,res, next)=>{
    const {id} = req.body;
    const sql = `DELETE FROM publicationBooks WHERE id = '${id}'`;

        db.query(sql,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(200).json({
                message:"Publication Books deleted",
            })
        })
    
}
exports.getAllBooks =(req,res, next)=>{
    let sql = `SELECT * FROM publicationBooks`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Publication Books fetched",
            data:result
            // data: result[0]
        })
    })
}