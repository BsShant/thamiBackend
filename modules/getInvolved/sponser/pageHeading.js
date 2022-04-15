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
exports.vandMupload = upload.any();


exports.updateGetInvolvedSponsorPageHeader = (req, res, next)=>{
    
    const {pageHeading, pageSubHeading} = req.body
        const sql = `UPDATE getInvolvedSponsorPageHeading SET pageHeading = ?, pageSubHeading = ?`;
        db.query(sql,[pageHeading, pageSubHeading], (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            res.status(200).json({
                message:"Get Involved Donation page header has been updated"
            })
        })

}
exports.updateGetInvolvedSponsorPageImage = (req, res, next)=>{
    const image = req.files[0].filename;
  
        const sql = `UPDATE getInvolvedSponsorPageHeading SET image = '${image}'`;
        db.query(sql, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Database operation failed"
                })
            }
            console.log(result)
            res.status(200).json({
                message:"Get Involved Donation page image has been updated"
            })
        })

}

exports.getGetInvolvedSponsorPageHeading = (req, res, next)=>{
    let sql = `SELECT * FROM getInvolvedSponsorPageHeading`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return res.status(401).json({
                message:"Database operation failed",
            })
        }
        return res.status(200).json({
            message:"Get Involved Donation page Heading section fetched",
            data:result[0]
            // data: result[0]
        })
    })
}

exports.postGetInvolvedSponsorPageHeader = (req, res, next)=>{
    const {pageHeading, pageSubHeading} = req.body
    let sql = `INSERT INTO getInvolvedSponsorPageHeading SET ?`
    let data={pageHeading: pageHeading, pageSubHeading: pageSubHeading}
        db.query(sql,data, (error, result)=>{
            if(error){
                console.log(error)
                return res.status(401).json({
                    message:"Database operation failed",
                })
            }
            return res.status(201).json({
                message:"Get Involved Donation page heading section created",
            })
        })
       

}

exports.postGetInvolvedSponsorPageImage = (req, res, next)=>{
    const image = req.files[0].filename;
    
        const sql = 'INSERT INTO getInvolvedSponsorPageHeading SET ?' 
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
                message:"Get Involved Donation page image section created"
            })
        })

}
