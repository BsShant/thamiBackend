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
exports.uploadOurStory = upload.any();


exports.updateAboutUsOurStoryTextSection = (req, res, next)=>{
    
    const {heading, topTitle, detail, buttonName} = req.body
        const sql = `UPDATE aboutUsOurStory SET heading = ?, topTitle = ?, detail = ?`;
        db.query(sql,[heading, topTitle, detail] ,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            res.status(200).json({
                message:"Your About US Our Story has been updated"
            })
        })

}
exports.updateaboutUsOurStoryImageSection = (req, res, next)=>{
    const image = req.files[0].filename;
  
        const sql = `UPDATE aboutUsOurStory SET image = '${image}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(200).json({
                message:"Your About Us Our Story has been updated"
            })
        })

}

exports.getaboutUsOurStorySection = (req, res, next)=>{
    let sql = `SELECT * FROM aboutUsOurStory`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"About Us Our Story section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

exports.postAboutUsOurStoryTextSection = (req, res, next)=>{
    const {topTitle, heading, buttonName, detail}  = req.body;
    let sql = `INSERT INTO aboutUsOurStory SET ?`
    let data={topTitle: topTitle, heading: heading, detail:detail, buttonName: buttonName}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"About Us Our Story text section created",
            })
        })
       

}

exports.postaboutUsOurStoryImageSection = (req, res, next)=>{
    const image = req.files[0].filename;
    
        const sql = 'INSERT INTO aboutUsOurStory SET ?' 
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
                message:"About Us Our Story image section created"
            })
        })

}
