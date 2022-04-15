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
exports.ourTeam = upload.any();


exports.updateAboutUsGalleryPageHeader = (req, res, next)=>{
    
    const {pageHeading, pageSubHeading} = req.body
        const sql = `UPDATE aboutUsGalleryPageHeading SET pageHeading = ?, pageSubHeading = ?`;
        db.query(sql,[pageHeading, pageSubHeading] ,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            res.status(200).json({
                message:"Your About US Gallery page heading has been updated"
            })
        })

}
exports.updateAboutUsGalleryPageImage = (req, res, next)=>{
    const image = req.files[0].filename;
  
        const sql = `UPDATE aboutUsGalleryPageHeading SET image = '${image}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(200).json({
                message:"Your About Us Gallery Page image has been updated"
            })
        })

}

exports.getaboutUsGalleryPageHeading = (req, res, next)=>{
    let sql = `SELECT * FROM aboutUsGalleryPageHeading`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"About Us Gallery Heading section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

exports.postAboutUsGalleryPageHeader = (req, res, next)=>{
    const {pageHeading, pageSubHeading} = req.body
    let sql = `INSERT INTO aboutUsGalleryPageHeading SET ?`
    let data={pageSubHeading: pageSubHeading, pageHeading: pageHeading}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"About Us Gallery page heading created",
            })
        })
       

}

exports.postAboutUsGalleryPageImage = (req, res, next)=>{
    const image = req.files[0].filename;
    
        const sql = 'INSERT INTO aboutUsGalleryPageHeading SET ?' 
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
                message:"About Us Gallery page image section created"
            })
        })

}
