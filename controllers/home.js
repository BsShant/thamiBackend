const {db} = require('../utils/db');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({

    destination:(req, file, callback)=>{
        callback(null, path.join(__dirname, '../public'));
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
exports.uploadSingle = upload.any();



exports.updateHeroSection = (req,res,next)=>{
const {heading, subHeading, buttonName } = req.body;
let sql = `UPDATE hero SET heading = ?, subHeading = ?, buttonName = ?`;
    db.query(sql,[heading, subHeading, buttonName] ,(error,result)=>{
        if(error){
            return res.status(400).json({
                message:"Database operation failed",
            })
        }
        if(!result){
            return res.status(404).json({
                message:"The item doesn't exist"
            })
        }
        return res.status(200).json({
            message:"Hero section updated",
            // data: result[0]
        })
    })
}

exports.getHeroSection = (req,res,next)=>{
    let sql = `SELECT * FROM hero`;
        db.query(sql, (error,result)=>{
            if(error){
                console.log(error)
                return res.statu(400).json({
                    message:"Database operation failed",
                })
            }
            if(!result){
                return res.status(404).json({
                    message:"The item doesn't exist",
                })
            }
            return res.status(200).json({
                message:"Hero section fetched",
                data:result[0]
                // data: result[0]
            })
        })
    }


