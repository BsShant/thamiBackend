const {db} = require('../../utils/db');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({

    destination:(req, file, callback)=>{
        callback(null, path.join(__dirname, '../../public'));
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
exports.aboutUsUpload = upload.any();



exports.updatehomeAboutUsImageSection = (req, res, next)=>{
    const {files} = req;
    let imageBefore, imageAfter, sql, uploadImage;
   files.map((image, index)=>{
    if(image.fieldname=='imageBefore'){
        uploadImage = image.filename;
        sql = `UPDATE homeAboutUs SET imageBefore = ?`;
        return;

    }
    if(image.fieldname=='imageAfter'){
        uploadImage = image.filename;
        sql = `UPDATE homeAboutUs SET imageAfter = ?`;
        return;

    }
    return;
   })
   console.log(uploadImage)
        db.query(sql,[uploadImage],(error, result)=>{
            if(error){
                console.log(error)
                return res.status(400).json({
                    message: "Database operation failed"
                })
            }
            if(!result){
                return res.status(404).json({
                    message:"The item doesn't exist",
                })
            }
            return res.status(200).json({
                message:"Your about section has been updated"
            })
        })

}
exports.updatehomeAboutUsTextSection = (req, res, next)=>{
    
    const {heading, topTitle, detail, buttonName} = req.body
        const sql = `UPDATE homeAboutUs SET heading = ?, topTitle = ?, detail = ?, buttonName = ?`;
        db.query(sql,[heading, topTitle, detail, buttonName], (error, result)=>{
            if(error){
                console.log(error)
                return res.status(400).json({
                    message: "Database operation failed"
                })
            }
            if(!result){
                return res.status(404).json({
                    message:"The item doesn't exist",
                })
            }
            return res.status(200).json({
                message:"Your about section has been updated"
            })
        })

}

exports.gethomeAboutUsSection = (req, res, next)=>{
    let sql = `SELECT * FROM homeAboutUs`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(400).json({
                message:"Database operation failed",
            })
        }
        if(!result){
            return res.status(404).json({
                message:"The item doesn't exist",
            })
        }
        return res.status(200).json({
            message:"Home About us section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

// post home about us text and image

exports.posthomeAboutUsTextSection = (req, res, next)=>{
    const {topTitle, heading, buttonName, detail}  = req.body;
    let sql = `INSERT INTO homeAboutUs SET ?`
    let data={topTitle: topTitle, heading: heading, detail:detail, buttonName: buttonName}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(400).json({
                    message:"Database operation failed",
                })
            }
            if(!result){
                return res.status(404).json({
                    message:"The item doesn't exist",
                })
            }
            return res.status(201).json({
                message:"Home About us text section created",
            })
        })
       

}

exports.posthomeAboutUsImageSection = (req, res, next)=>{
    const {files} = req;
    console.log(req.body)
    let imageBefore, imageAfter;
   files.map((image, index)=>{
    if(image.fieldname=='imageBefore'){
        return imageBefore = image.filename;
    }
    if(image.fieldname=='imageAfter'){
        return imageAfter = image.filename;
    }
    return;
   })
        const sql = 'INSERT INTO homeAboutUs SET ?' 
        const data = {imageBefore :imageBefore, imageAfter: imageAfter}
        db.query(sql, data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(400).json({
                    message: "Database operation failed"
                })
            }
            if(!result){
                return res.status(404).json({
                    message:"The item doesn't exist",
                })
            }
            console.log(result)
            return res.status(201).json({
                message:"YHome About us image section created"
            })
        })

}