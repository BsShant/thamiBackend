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
exports.publicationUpload = upload.any();



exports.updatehomePublicationImageSection = (req, res, next)=>{
    const image = req.files[0].filename;
  
        const sql = `UPDATE homePublication SET image = '${image}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.json({
                message:"Your Publication has been updated"
            })
        })

}
exports.updatehomePublicationTextSection = (req, res, next)=>{
    
    const {heading, topTitle, detail, buttonName} = req.body
        const sql = `UPDATE homePublication SET heading = '${heading}', topTitle = '${topTitle}', detail = '${detail}', buttonName = '${buttonName}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.json({
                    message: "Database operation failed"
                })
            }
            res.json({
                message:"Your Home Publication section has been updated"
            })
        })

}

exports.gethomePublicationSection = (req, res, next)=>{
    let sql = `SELECT * FROM homePublication`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.json({
                message:"Database operation failed",
            })
        }
        return res.json({
            message:"Home Publication section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

// post home about us text and image

exports.posthomePublicationTextSection = (req, res, next)=>{
    const {topTitle, heading, buttonName, detail}  = req.body;
    let sql = `INSERT INTO homePublication SET ?`
    let data={topTitle: topTitle, heading: heading, detail:detail, buttonName: buttonName}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.json({
                    message:"Database operation failed",
                })
            }
            return res.json({
                message:"Home publication text section created",
            })
        })
       

}

exports.posthomePublicationImageSection = (req, res, next)=>{
    const image = req.files[0].filename;
    
        const sql = 'INSERT INTO homePublication SET ?' 
        const data = {image :image}
        db.query(sql, data, (error, result)=>{
            if(error){
                console.log(error)
                return res.json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.json({
                message:"Home Publication image section created"
            })
        })

}