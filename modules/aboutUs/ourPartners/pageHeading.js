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
exports.ourPartnersPageUpload = upload.any();


exports.updateAboutUsOurPartnersPageHeader = (req, res, next)=>{
    
    const {pageHeading, pageSubHeading} = req.body
        const sql = `UPDATE aboutUsOurPartnersPageHeading SET pageHeading = ?, pageSubHeading = ?`;
        db.query(sql,[pageHeading, pageSubHeading] ,(error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            res.status(200).json({
                message:"Your About US Our Partners page header has been updated"
            })
        })

}
exports.updateAboutUsOurPartnersPageImage = (req, res, next)=>{
    const image = req.files[0].filename;
  
        const sql = `UPDATE aboutUsOurPartnersPageHeading SET image = '${image}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(200).json({
                message:"Your About Us Our Partners Page image has been updated"
            })
        })

}

exports.getaboutUsOurPartnersPageHeading = (req, res, next)=>{
    let sql = `SELECT * FROM aboutUsOurPartnersPageHeading`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"About Us Our Partners page heading fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

exports.postAboutUsOurPartnersPageHeader = (req, res, next)=>{
    const {pageHeading, pageSubHeading} = req.body
    let sql = `INSERT INTO aboutUsOurPartnersPageHeading SET ?`
    let data={pageHeading: pageHeading, pageSubHeading: pageSubHeading}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"About Us Our Partners page header created",
            })
        })
       

}

exports.postAboutUsOurPartnersPageImage = (req, res, next)=>{
    const image = req.files[0].filename;
    
        const sql = 'INSERT INTO aboutUsOurPartnersPageHeading SET ?' 
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
                message:"About Us Our Partners page image section created"
            })
        })

}
