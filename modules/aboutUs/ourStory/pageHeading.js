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
exports.ourStoryUpload = upload.any();


exports.updateAboutUsOurStoryPageHeader = (req, res, next)=>{
    
    const {pageHeading, pageSubHeading} = req.body
        const sql = `UPDATE aboutUsOurStoryPageHeading SET pageHeading = ?, pageSubHeading = ?`;
        db.query(sql,[pageHeading,pageSubHeading], (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            res.status(200).json({
                message:"Your About US Our story page header has been updated"
            })
        })

}
exports.updateAboutUsOurStoryPageImage = (req, res, next)=>{
    const image = req.files[0].filename;
  
        const sql = `UPDATE aboutUsOurStoryPageHeading SET image = '${image}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(200).json({
                message:"Your About Us Our Story Page image has been updated"
            })
        })

}

exports.getaboutUsOurStoryPageHeading = (req, res, next)=>{
    let sql = `SELECT * FROM aboutUsOurStoryPageHeading`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"About Us Our Story Heading section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

exports.postAboutUsOurStoryPageHeader = (req, res, next)=>{
    const {pageHeading, pageSubHeading} = req.body
    let sql = `INSERT INTO aboutUsOurStoryPageHeading SET ?`
    let data={pageHeading: pageHeading, pageSubHeading: pageSubHeading}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"About Us Our Story header section created",
            })
        })
       

}

exports.postAboutUsOurStoryPageImage = (req, res, next)=>{
    const image = req.files[0].filename;
    
        const sql = 'INSERT INTO aboutUsOurStoryPageHeading SET ?' 
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
                message:"About Us Our Story header image section created"
            })
        })

}
