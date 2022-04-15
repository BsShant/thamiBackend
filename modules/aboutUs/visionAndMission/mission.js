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
exports.aboutUsMissionUpload = upload.any();



exports.updateaboutUsMissionImageSection = (req, res, next)=>{
    const image = req.files[0].filename;
  
        const sql = `UPDATE aboutUsMission SET image = '${image}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(200).json({
                message:"Your About Us Mission Image has been updated"
            })
        })

}
exports.updateaboutUsMissionTextSection = (req, res, next)=>{
    
    const {heading, topTitle, detail} = req.body
        const sql = `UPDATE aboutUsMission SET heading = ?, topTitle = ?, detail = ?`;
        db.query(sql, [heading, topTitle, detail],(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            res.status(200).json({
                message:"Your About Us Mission section has been updated"
            })
        })

}

exports.getaboutUsMissionSection = (req, res, next)=>{
    let sql = `SELECT * FROM aboutUsMission`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"About Us Mission section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

// post home about us text and image

exports.postaboutUsMissionTextSection = (req, res, next)=>{
    const {topTitle, heading, detail}  = req.body;
    let sql = `INSERT INTO aboutUsMission SET ?`
    let data={topTitle: topTitle, heading: heading, detail:detail}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"About Us Mission text section created",
            })
        })
       

}

exports.postaboutUsMissionImageSection = (req, res, next)=>{
    const image = req.files[0].filename;
    
        const sql = 'INSERT INTO aboutUsMission SET ?' 
        const data = {image :image}
        db.query(sql, data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(201).json({
                message:"About Us Mission image section created"
            })
        })

}